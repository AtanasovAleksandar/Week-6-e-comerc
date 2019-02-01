import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import {
  AngularFireStorage,
  AngularFireStorageReference, AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  productId: number;
  product: Product = {} as Product;
  downloadSrc: string;
  categories: Category[] = [];
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<void>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  downloadLink: Object;
  imageId: string;
  

  constructor(public activatedRout: ActivatedRoute,
    public router: Router,
    public productService: ProductsService,
    private afStorage: AngularFireStorage,
    public categoriesService: CategoriesService) {}

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.productId = parseInt(params.id);
      this.imageId = params.photoName;
    });
    this.getProduct();
    this.getCategories();
}

upload(event) {
  this.ref = this.afStorage.ref(this.imageId);
  this.task = this.ref.put(event.target.files[0]);
  this.uploadState = this.task.snapshotChanges().pipe(map(s => this.getUrl(s.metadata)));
  this.uploadProgress = this.task.percentageChanges();
}

delete() {
  var storage = this.afStorage.storage;
  var storageRef = storage.ref().child(this.imageId);
  console.log(storageRef)
  storageRef.delete().then(
    resolve => {
      console.log('success')
      this.downloadSrc = '';
    },
    reject => {
      console.log('error')
    });
}

getUrl(s) {
  if (s != null) {
    this.ref.getDownloadURL().subscribe(
      data => {
        this.downloadSrc = data;
        console.log(this.downloadSrc)
      },
      error => {
        console.log('File is to big')
      });
  }
}


getProduct() {
  this.productService.getProducts().subscribe(
    data => {
      this.categories = data
      this.product = data[this.productId];
      console.log(this.product)
      this.downloadSrc = this.product.imageUrl;
    }
  )
}

getCategories() {
  this.categoriesService.getAllCategories().subscribe(
    data => {
      this.categories = data;
    }
  )
}

productChange() {
  this.product.imageUrl = this.downloadSrc;
  this.productService.editProduct(this.product,this.product.id).subscribe (
    data => {
      this.router.navigate(['Products']);
    }
  )
}



}
