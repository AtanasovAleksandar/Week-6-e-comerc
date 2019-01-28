import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  storage = 'gs://usermenagment.appspot.com/'

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(public http: HttpClient) {
  }


  

  fileUpload(file): Observable<any> {
    return this.http.post(this.storage, file)
  }
}
