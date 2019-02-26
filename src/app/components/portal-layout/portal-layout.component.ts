import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountService } from 'src/app/services/count.service';
import { EmmitService } from 'src/app/services/emmit.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  itemfounded: boolean = true;
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
    this.getCategory();
    this.getActiveProducts();
    this.getAll();
    console.log(this.previousRouteService.getPreviousUrl());
    this.cartItems = localStorage.length;
    this.activeRouter.params.subscribe((params) => {
      this.activeCategory = params.id;
      if (this.activeCategory != 'Home') {
        this.filterByName(this.activeCategory);
      }
      console.log(params)
    });
    this.emmitService.cName.subscribe(
      name => {
        this.activeCategory = name;
      }
    )
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe(
      data => {
        this.loading = false;
        this.products = data;
        this.empty = false;
        this.searchActive = false;
        console.log(data)
      }
    )
  }

  getActiveProducts() {
    this.emmitService.activeCategoryFilter.subscribe(
      data => {
        if (this.activeCategory == 'Home') {
        } else {
          this.categoryId = data;
        }
      }
    )
  }

  searchProducts() {
    this.loading = true;
    this.emmitService.inputSearch.subscribe(
      (data: Product[]) => {
        if (data.length != 0) {
          this.empty = false;
          this.loading = false;
          this.productFilter = data;
        } else {
          this.getAll();
        }
      }
    )
  }

  getAll() {
    if (this.activeCategory == 'Home') {
      this.productService.getProducts().subscribe(
        data => {
          this.productFilter = data;
          this.products = data;
          this.loading = false;
          this.empty = false;
          //ako vikam pak filter nema da napravi push vo subsribot
          // if (this.previousRouteService.getPreviousUrl() == '/Shopping-cart') {
          //  this.filterByName(this.activeCategory);
          // } 
        }
      )
    } else {
      // this.filterByName(this.activeCategory);
    }
  }

  filterByName($event) {
    this.loading = false;
    this.emmitService.activeCategoryFilter.subscribe(
      id => {
        this.categoryId = id
        this.loading = false;
      })

    if (this.categoryId == 0 && typeof $event == 'number') {
      this.loading = false;
      this.getAll();
    } else if (typeof $event == 'string' && $event != '') {
     
      const source = from(this.products);
      this.loading = false;
      const newFilterProducts = source.pipe(
        filter(
          data => data.name == $event
        )
      )
      if (this.products.length != 0 ) {
        newFilterProducts.subscribe(
          (data) => {
            this.productFilter = []
            this.activeCategory = 'Search results:'
            this.productFilter.push(data);
            this.empty = false;
            console.log(this.productFilter)
          }
        )
      }
      this.loading = false;
      if (this.productFilter.length == 0) {
        this.empty = true;
      }
    } else if (typeof $event == 'string' && $event == '') {
      this.activeCategory = 'Home';
      this.getAll();
    } else {
      this.productFilter = [];
      const source = from(this.products);
      this.loading = false;
      const newFilterProducts = source.pipe(
        filter(
          data => data.categoryId == this.categoryId
        )
      )
      /* 
      ne go pravi subsribot na vreme koga prviot pat po vrakanjeto na rutata
      pred da se napravi zemanjeto na produktite pravi filtriranje a this.produkt 
      e prazen zatoa pravam getAll ama posle zemanjeto na produktite pa subsribot ne 
      gi dava za da gi stavam vo nizata i da se prikazat vo newFilterProducts

      resenija da ne se pravi destory na komonentata koga ke odam u cart 

      da ja cuvam nizata vo storage so produktite i sekogas nizata da ima produkti
      */
      newFilterProducts.subscribe(
        (data) => {
          this.productFilter.push(data);
          this.empty = false;
          console.log(this.productFilter)
        }
      )
      this.loading = false;
      if (this.productFilter.length == 0) {
        this.empty = true;
      }
    }
  }

  search() {
    this.emmitService.search.subscribe(
      word => {
        this.productFilter = [];
        const source = from(this.products);
        this.loading = false;
        const newFilterProducts = source.pipe(
          filter(
            data => data.name == word
          )
        )
        newFilterProducts.subscribe(
          (data) => {
            this.productFilter.push(data);
            this.empty = false;
            console.log(this.productFilter)
          }
        )
      })
  }
  searchFilter() {
    this.loading = true;
    this.productService.searchByName(this.sName).subscribe(
      data => {
        this.activeCategory = 'search results:';
        this.loading = false;
        this.productFilter = data;
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

  changeView($event) {
    this.detail = $event;
  }

  checkProductActive(itemID) {
    this.detail = true;
    this.activeCategory = 'Detail View';
    this.router.navigate(['Portal', itemID]);
  }


}
