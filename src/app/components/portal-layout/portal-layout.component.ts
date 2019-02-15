import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PortalLayoutComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  searchName: string;
  searchActive: boolean = false;
  notFound: boolean = false;
  mainMenu: Product[] = [];
  activeCategory: string = 'Home';
  empty: boolean = false;
  cartItems: number = 0;
  itemfounded: boolean = true;
  loading: boolean;

  constructor(public productService: ProductsService,
    public categoryService: CategoriesService,
    public activeRouter: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategory();
    this.cartItems = localStorage.length;
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe(
      data => {
        this.loading = false;
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
    this.loading = true;
    this.productService.searchByName(this.searchName).subscribe(
      data => {
        this.loading = false;
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

  checkCategory(categoryIT, name) {
    this.loading = true;
    this.productService.searchByCategoryId(categoryIT).subscribe(
      (data: Product[]) => {
        this.loading = false;
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
    let itemFounded = true;
    let key = item.id;
    let val = item.name
    let keys = Object.keys(localStorage);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      const keysCurrent = keys[i];
      console.log(key);
      if (key == parseInt(keysCurrent)) {
        this.toastr.info('You have this product in cart!');
        itemFounded = false;
      }
    }

    localStorage.setItem(key, val);
    this.cartItems = localStorage.length;
    this.router.navigate(['Portal']);
    if (itemFounded) {
      this.toastr.success('You add item to cart');
    }
  }
}
