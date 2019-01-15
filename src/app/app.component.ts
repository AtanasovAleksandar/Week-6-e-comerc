import { Component } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  countCategory:number;
  
  constructor(public categoriesService: CategoriesService) {
    this.getCategortiesCount()
  }

  getCategortiesCount() {
    this.categoriesService.getAllCategories().subscribe(
      data => {
        this.countCategory = data.length;
      }
    )
  }
}
