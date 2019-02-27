import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountService } from 'src/app/services/count.service';
import { EmmitService } from 'src/app/services/emmit.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';


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
  itemFounded: boolean = true;
  loading: boolean;
  categoryId: number;
  categoryName: string;
  detail = false;
  quantity: number = 1;
  Exists: boolean = false;
  sName: string;
  productFilter: Product[] = [];

  constructor(public productService: ProductsService,
    public categoryService: CategoriesService,
    public activeRouter: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    public countService: CountService,
    public emmitService: EmmitService,
    private previousRouteService: PreviousRouteService) { }

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
      this.activeCategory = params.id;
      //from shopping cart
      if (this.activeCategory != 'Home') {
        this.filterByName(this.activeCategory);
      }
    });
    this.getCategory();
    this.getActiveCategory();
    if (this.previousRouteService.getPreviousUrl() != '/Shopping-cart'
      || this.previousRouteService.getPreviousUrl() == '/Shopping-cart' && this.activeCategory == 'Home') {
      this.getAllProducts();
    }
    this.cartItems = localStorage.length;
    this.emmitService.cName.subscribe(
      name => {
        this.activeCategory = name;
      }
    )
  }

  getActiveCategory() {
    this.emmitService.activeCategoryFilter.subscribe(
      data => {
        if (this.activeCategory == 'Home') {
        } else {
          this.categoryId = data;
        }
      }
    )
  }

  getAllProducts() {
    if (this.activeCategory == 'Home') {
      this.loading = true;
      this.productService.getProducts().subscribe(
        data => {
          this.productFilter = data;
          this.products = data;
          this.loading = false;
          this.empty = false;
        }
      )
    }
  }

  filterByName($event) {
    if (this.activeCategory == 'Search Results' && $event == '') {
      this.router.navigate(['/Portal', 'Home']);
      this.activeCategory = 'Home';
    }
    this.loading = true;
    this.emmitService.allProd.subscribe(
      (data: Product[]) => {
        this.loading = false;
        this.productFilter = data;
        this.empty = false;
        if (data.length == 0) {
          this.empty = true;
          this.loading = false;
        }
        if (this.activeCategory == 'Home' && $event == '') {
          this.getAllProducts();
        }
        if (this.activeCategory == 'Search' && $event != '') {
          this.activeCategory = 'Search';
        }
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
    if (!this.Exists) {
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
    itemsAdded.push(prodClick, this.quantity);
    let val = JSON.stringify(itemsAdded);
    let keys = Object.keys(localStorage);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      const keysCurrent = keys[i];
      console.log(key);
      if (key == parseInt(keysCurrent)) {
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

  checkProductActive(itemID) {
    this.detail = true;
    this.activeCategory = 'Detail View';
    this.router.navigate(['Portal', itemID]);
  }


}
