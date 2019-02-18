import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-nav-portal',
  templateUrl: './nav-portal.component.html',
  styleUrls: ['./nav-portal.component.scss']
})
export class NavPortalComponent implements OnInit {

  categories: Category[] = [];
  searchName: string;
  mainMenu: Product[] = [];

  constructor(public categoryService: CategoriesService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data.slice(5);
        this.mainMenu = data.slice(0, 5);
      }
    )
  }

  checkInput() {
    if (this.searchName == '') {
      this.searchName = '';
      this.sentSearchName();
    }
  }

  @Output() searchEvent = new EventEmitter<string>();
  @Output() FilterEventId = new EventEmitter<number>();
  @Output() FilterEventName = new EventEmitter<String>();
  @Output() GetAllCategories = new EventEmitter<String>();

  sentSearchName() {
    this.searchEvent.emit(this.searchName);
  }

  checkCategory(id, name) {
    this.FilterEventId.emit(id);
    this.FilterEventName.emit(name);
  }

  getAll(name) {
    this.GetAllCategories.emit(name);
  }



}
