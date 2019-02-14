import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';
import { Product } from '../models/products.model';


@Injectable({
  providedIn: 'root'
})
export class CountService {

  private count = new BehaviorSubject<number>(0);
  private countProducts = new BehaviorSubject<number>(0);
  private routeChange = new BehaviorSubject<string>('');

  cast = this.count.asObservable();
  castProducts = this.countProducts.asObservable();
  castRouteChange = this.routeChange.asObservable();

  constructor(public categoriesService: CategoriesService,
    public productsService: ProductsService) {
  }


  getCount() {
    this.categoriesService.getCountVal().subscribe(
      data => {
        this.count.next(data.count)
      }
    )
  }

  getProductCount() {
    this.productsService.getProductsCount().subscribe(
      data => {
        this.countProducts.next(data.count)
      })
  }
}
