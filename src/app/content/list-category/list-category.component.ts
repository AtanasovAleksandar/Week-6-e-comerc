import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/icategories';
import { CategoriesService } from 'src/app/categories.service';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  Category = [];
  activeSearch: Boolean = false;
  searchName:string;

  constructor(public categoriesService: CategoriesService) { 
    this.getCategories()
  }

  ngOnInit() {
  }


  getCategories() {
    this.categoriesService.getAllCategories().subscribe(
      data => {
        console.log(data)
        this.Category = data;
        this.activeSearch = false;
      }
    )
  }

  deleteCategory(id) {
    this.categoriesService.deleteCategory(id).subscribe(
      data => {
        this.getCategories();
      }
    )
  }

  searchCategory() {
    this.categoriesService.searchByName(this.searchName).subscribe(
      data => {
        this.Category = data;
        this.activeSearch = true;
      }
    )
  }

}
