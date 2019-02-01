import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {
  AngularFireStorage,
  AngularFireStorageReference, AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<void>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  downloadLink: Object;
  downloadSrc: string;
  selectedOption: Category = {} as Category;
  products: Product = {} as Product;
  categories: Category[] = [];
  imageId: string;
  available: boolean;

  constructor(public http: HttpClient,
    public productService: ProductsService,
    private afStorage: AngularFireStorage,
    private productsService: ProductsService,
    public categoryService: CategoriesService,
    public router: Router) {
    this.getIdOfParentCategory()
  }

  ngOnInit() {
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.imageId = id;
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

  getIdOfParentCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  availableProduct(e) {
    console.log(e.target.checked)
    this.available = e.target.checked
  }

  postProducts() {
    this.products.imageUrl = this.downloadSrc;
    this.products.categoryId = this.selectedOption.id;
    this.products.isAvailable = this.available;
    console.log(this.available)
    this.productsService.addProducts(this.products).subscribe(
      data => {
        this.router.navigate(['Products']);
      }
    )
  }
}


