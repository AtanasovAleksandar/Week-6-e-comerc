import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss'],
  encapsulation: ViewEncapsulation.None 
})

export class PortalLayoutComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  searchName:string;
  searchActive:boolean = false;
  notFound: boolean = false;
  mainMenu: Product[] = [];
  activeCategory: string = 'Home';
  empty: boolean = false;
  cartItems: number = 0;

  constructor(public productService: ProductsService,
    public categoryService: CategoriesService,
    public activeRouter: ActivatedRoute,
    public router: Router,) { }

  ngOnInit() {
    this.getProducts();
    this.getCategory();
    this.cartItems = localStorage.length;
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
        this.activeCategory = 'Home'
        this.searchName = '';
        this.empty = false;
        this.searchActive = false;
        console.log(data)
      }
    )
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data.slice(5);
        this.mainMenu = data.slice(0, 5);
      }
    )
  }

  searchProducts() {
    this.productService.searchByName(this.searchName).subscribe(
      data => {
        this.products = data;
        this.activeCategory = "Results:"
        this.searchActive = true;
        this.notFound = false;
        if (this.searchName == '') {
          this.notFound = true;
        }
      }
    )
  }

  checkCategory(categoryName,name) {
    this.productService.searchByCategoryId(categoryName).subscribe (
      ( data:Product[] )=> {
        this.products = data;
        this.empty = false;
        if (data.length == 0) {
          this.empty = true;
        }
        this.activeCategory = name;
      }
    )
  }

  addToCart(item) {
    let key = item.id;
    let val = item.name
    localStorage.setItem(key, val);
    this.cartItems = localStorage.length
    this.router.navigate(['Portal']);
  }

}
