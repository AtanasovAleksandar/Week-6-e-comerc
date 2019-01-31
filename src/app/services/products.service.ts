import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsApi = 'http://127.0.0.1:3000/products'

  constructor(public http: HttpClient) {
  }

  addProducts(products):Observable<Object> {
    return this.http.post(this.productsApi, products )
  }
}
