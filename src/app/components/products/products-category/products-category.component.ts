import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { ToastrService } from 'ngx-toastr';
import { CountService } from 'src/app/services/count.service';
import {
  AngularFireStorage,
  AngularFireStorageReference, AngularFireUploadTask
} from 'angularfire2/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss']
})
export class ProductsCategoryComponent implements OnInit {
  products: Product[] = [];
  activeDelete: boolean;
  currentId: number;
  imageName: string;
  searchName: string;
  activeSearch: boolean;

  constructor(public productService: ProductsService,
    private toastr: ToastrService,
    public countService: CountService,
    private afStorage: AngularFireStorage,
    public activatedRout: ActivatedRoute,
    public router: Router,) { }

  ngOnInit() {
    this.getProducts()
    this.countService.getProductCount();
    this.countService.getCount();
  }

getProducts() {
  this.activeSearch = false;
  this.searchName = '';
  this.productService.getProducts().subscribe( 
    data => {
      this.products = data;
      console.log(this.products)
    });
  }


  showDeleteModule(id) {
    this.activeDelete = true;
    this.currentId = id
  }

  showSuccess() {
    this.toastr.success('Category Deleted');
  }

  delete(imgName) {
    var storage = this.afStorage.storage;
    var storageRef = storage.ref().child(imgName);
    console.log(storageRef)
    storageRef.delete().then(
      resolve => {
        console.log('success')
      },
      reject => {
        console.log('error')
      });
  }

  deleteCategory(confirm,imgName) {
    this.activeDelete = true;
    if (confirm == 'YES') {
      this.productService.deleteCategory(this.currentId).subscribe(
        data => {
          this.delete(imgName);
          this.getProducts();
          this.countService.getProductCount();
          this.showSuccess();
        }
      )
      this.activeDelete = false;
    } else if (confirm == 'NO') {
      this.activeDelete = false;
    }
  }

  searchCategory() {
    if (this.searchName) {
      this.productService.searchByName(this.searchName).subscribe(
        data => {
          this.products = data;
          this.activeSearch = true;
        })

    } else if (this.searchName == '') {
      this.getProducts();
    }
  }
}





