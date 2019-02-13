import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsApi = 'http://127.0.0.1:3000/products'
  productCount = 'http://127.0.0.1:3000/products/count'

  constructor(public http: HttpClient) {
  }

  addProducts(products):Observable<Object> {
    return this.http.post(this.productsApi, products )
  }

  getProducts():Observable<any> {
    return this.http.get(this.productsApi);
  }

  getProduct(id):Observable<any> {
    return this.http.get(this.productsApi + '/' + id)
  }

  getProductsCount(): Observable<any> {
    return this.http.get(this.productCount)
  }

  editProduct(newProduct,id):Observable<Object> {
    return this.http.put(this.productsApi + '/' + id , newProduct)
  }

  deleteCategory(category) {
    return this.http.delete(this.productsApi+'/'+ category)
  }

  searchByName(name):Observable<any> {
    return this.http.get(this.productsApi + '?filter[where][name]=' + name)
  }

  searchByCategoryId(id):Observable<any> {
    return this.http.get(this.productsApi + '?filter[where][categoryId]=' + id)
  }


}
