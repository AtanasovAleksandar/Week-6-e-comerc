import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  api = 'http://127.0.0.1:3000/categories';
  apiCount = 'http://127.0.0.1:3000/categories/count';

  constructor(private http: HttpClient) { }


  addNewCategory(newCategory): Observable<any> {
    return this.http.post(this.api, newCategory)
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.api);
  }

  getCountVal(): Observable<any> {
    return this.http.get(this.apiCount)
  }

  editCategory(id,newData) {
    debugger
    return this.http.put(this.api + '/' + id , newData)
  }


  deleteCategory(category) {
    return this.http.delete(this.api+'/'+ category)
  }

  searchByName(name):Observable<any> {
    return this.http.get(this.api + '?filter[where][name]=' + name)
  }

}
