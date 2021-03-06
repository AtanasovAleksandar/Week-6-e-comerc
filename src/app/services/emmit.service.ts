import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from './products.service';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class EmmitService {
  products: Product[] = [];

  constructor(public productService: ProductsService) { }

  private activeCategory = new BehaviorSubject<number>(null);
  private home = new BehaviorSubject<string>('');
  private categoryName = new BehaviorSubject<string>('Home')
  private searchTerms = new BehaviorSubject<string>('');
  private searchword = new BehaviorSubject<Object>([]);
  private allProducts = new BehaviorSubject<Object>([]);

  activeCategoryFilter = this.activeCategory.asObservable();
  homeIsActive = this.home.asObservable();
  cName = this.categoryName.asObservable();
  search = this.searchTerms.asObservable();
  inputSearch = this.searchword.asObservable();
  allProd = this.allProducts.asObservable();

  getActiveParentCategory(id) {
    this.activeCategory.next(id);
  }

  getAllHome(home) {
    this.home.next(home);
  }

  categoryNameActive(name) {
    this.categoryName.next(name);
  }

  searchWord(word) {
    this.searchTerms.next(word)
  }

  getSearch(data) {
    this.searchword.next(data)
  }

  getProducts() {
    this.allProducts.next(this.products)
  }

 ////////////////////////////

  filterProducts(id) {
    this.productService.searchByCategoryId(id).subscribe(
      data => {
        this.products = data;
        this.getProducts()
      }
    )
  }

  filterProductsName(name) {
    this.productService.searchByName(name).subscribe(
      data => {
       this.products = data;
       this.getProducts()
      }
    )
  }

}