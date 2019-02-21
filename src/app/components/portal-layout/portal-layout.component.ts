import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountService } from 'src/app/services/count.service';


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
  categoryId: number;
  categoryName: string;
  detail = false;
  quantity:number = 1;
  Exists: boolean = false;;

  constructor(public productService: ProductsService,
    public categoryService: CategoriesService,
    public activeRouter: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    public countService: CountService) { }

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

  checkInput() {
    if (this.searchName == '') {
      this.getProducts();
    }
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data.slice(5);
        this.mainMenu = data.slice(0, 5);
      }
    )
  }

  receiveSearchName($event) {
    this.searchName = $event
    this.searchProducts();
  }

  searchProducts() {
    this.loading = true;
    this.productService.searchByName(this.searchName).subscribe(
      data => {
        this.detail = false;
        this.loading = false;
        this.products = data;
        this.activeCategory = "Results:"
        this.searchActive = true;
        this.notFound = false;
        if (this.searchName == '') {
          this.notFound = true;
          this.getProducts();
        }
      }
    )
  }

  categoryClickId($event) {
    this.categoryId = $event
  }

  categoryClickName($event) {
    this.detail = false;
    this.categoryName = $event
    this.checkCategory();
  }

  getAll($event) {
    this.detail = false;
    this.getProducts();
  }

  checkCategory() {
    this.loading = true;
    this.productService.searchByCategoryId(this.categoryId).subscribe(
      (data: Product[]) => {
        this.loading = false;
        this.products = data;
        this.empty = false;
        if (data.length == 0) {
          this.empty = true;
        }
        this.activeCategory = this.categoryName;
      }
    )
  }

  checkIfExist(product) {
    let keys = Object.keys(localStorage);
    let key = product.id
    this.Exists = false;
    for (var i = 0; i <= keys.length; i++) {  //check if already exists
      const keysCurrent = keys[i];
      console.log(key);
      if (key == parseInt(keysCurrent)) {
        this.Exists = true;
      } 
    }
    if ( !this.Exists ) {
      this.addToCart(product);
    } else {
      this.toastr.info('You have this product in cart!');
    }
  }

  addToCart(item) {
    let itemFounded = true;
    let key = item.id;
    let prodClick = item
    let itemsAdded = []
    itemsAdded.push(prodClick,this.quantity);
    let val = JSON.stringify(itemsAdded);
    let keys = Object.keys(localStorage);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      const keysCurrent = keys[i];
      console.log(key);
      if (key == parseInt(keysCurrent)) {
        // this.toastr.info('You have this product in cart!');
        itemFounded = false;
      }
    }

    localStorage.setItem(key, val);
    this.cartItems = localStorage.length;
    this.countService.getShoppingCartLength();
    if (itemFounded) {
      this.toastr.success('You add item to cart');
    }
  }

  changeView($event) {
    this.detail = $event;
  }

  checkProductActive(itemID) {
    this.detail = true;
    this.activeCategory = 'Detail View';
    this.router.navigate(['Portal', itemID]);
  }

  
}
