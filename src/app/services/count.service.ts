import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriesService } from './categories.service';


@Injectable({
  providedIn: 'root'
})
export class CountService {

  private count = new BehaviorSubject<number>(0);
  cast = this.count.asObservable();

  constructor(public categoriesService: CategoriesService) {
  }

  
  getCount() {
    this.categoriesService.getCountVal().subscribe(
      data => {
        this.count.next(data.count)
      }
     )
    
  }


}
