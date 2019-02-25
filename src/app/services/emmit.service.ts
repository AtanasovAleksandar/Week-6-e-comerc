import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmmitService {

  constructor() { }

  private activeCategory = new BehaviorSubject<number>(null);
  private home = new BehaviorSubject<string>('');
  private categoryName = new BehaviorSubject<string>('Home')
  private searchTerms = new BehaviorSubject<string>('');

  activeCategoryFilter = this.activeCategory.asObservable();
  homeIsActive = this.home.asObservable();
  cName = this.categoryName.asObservable();
  search = this.searchTerms.asObservable();
  
  getActiveParentCategory(id) {
    this.activeCategory.next(id);
  }

  getAllHome(home) {
    this.home.next(home);
  }

  categoryNameActive(name) {
    this.categoryName.next(name)
  }

  searchWord(word) {
    this.searchTerms.next(word)
  }
}

//da napravam tuka filtiranje i posle da go pustam na next rezultatot

