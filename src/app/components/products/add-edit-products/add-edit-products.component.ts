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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {
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
  available: boolean;
  activePage: string;
  title: string;
  activePageAction: boolean;
  selectedOption: Category = {} as Category;
  newImageId: string;
  parent: number;

  constructor(public activatedRout: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    public productService: ProductsService,
    private afStorage: AngularFireStorage,
    public categoriesService: CategoriesService) { }

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.productId = parseInt(params.id);
      this.imageId = params.photoName;
      this.activePage = params.active
    });
    if (this.activePage == 'Add-products') {
      this.title = ' Add';
      const id = Math.random().toString(36).substring(2);
      this.newImageId = id;
      this.activePageAction = true
      this.getCategories();
    } else {
      this.title = ' Edit';
      this.activePageAction = false;
      this.getProduct();
      this.getCategories();
    }
  }

  upload(event) {
    if (this.activePage == 'Add-products') {
      const id = Math.random().toString(36).substring(2);
      this.newImageId = id;
      this.ref = this.afStorage.ref(this.newImageId);
      this.task = this.ref.put(event.target.files[0]);
      this.uploadState = this.task.snapshotChanges().pipe(map(s => this.getUrl(s.metadata)));
      this.uploadProgress = this.task.percentageChanges();
    } else {
      this.ref = this.afStorage.ref(this.imageId);
      this.task = this.ref.put(event.target.files[0]);
      this.uploadState = this.task.snapshotChanges().pipe(map(s => this.getUrl(s.metadata)));
      this.uploadProgress = this.task.percentageChanges();
    }
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
    this.productService.getProduct(this.productId).subscribe(
      data => {
        this.product = data;
        console.log(this.product)
        this.downloadSrc = this.product.imageUrl;
      }
    )
  }

  getCategories() {
    this.categoriesService.getAllCategories().subscribe(
      data => {
        this.categories = data;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.product.categoryId == this.categories[i].id) {
            this.parent = i;
          }
        }
        this.selectedOption = this.categories[this.parent]
      })
  }

  availableProduct(e) {
    console.log(e.target.checked)
    this.available = e.target.checked
  }


  checkActivePage() {
    if (this.activePage == 'Add-products') {
      this.addNewProduct();
      console.log('Add')
    } else {
      this.productChange();
      console.log('Edit')
    }
  }

  addNewProduct() {
    this.product.imageUrl = this.downloadSrc;
    this.product.categoryId = this.selectedOption.id;
    this.product.isAvailable = this.available;
    this.product.imageName = this.newImageId;
    console.log(this.available)
    this.productService.addProducts(this.product).subscribe(
      data => {
        this.router.navigate(['Products', 'pr']);
        this.toastr.success('New product added');
      }
    )
  }

  productChange() {
    this.product.imageUrl = this.downloadSrc;
    this.product.isAvailable = this.available;
    this.product.categoryId = this.selectedOption.id;
    this.productService.editProduct(this.product, this.product.id).subscribe(
      data => {
        this.router.navigate(['Products', 'pr']);
        this.toastr.success(' Product changed');
      }
    )
  }
}




