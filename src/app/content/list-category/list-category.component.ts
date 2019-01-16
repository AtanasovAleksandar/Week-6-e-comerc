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
  activeDelete:boolean = false;

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

  deleteConfirm(confirm) {
   
  }

  deleteCategory(id , confirm) {
    this.activeDelete = true;
    if (confirm == 'YES') {
      this.categoriesService.deleteCategory(id).subscribe(
        data => {
          this.getCategories();
        }
      )
      this.activeDelete = false;
    } else if (confirm == 'NO') {
      this.activeDelete = false;
    }
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
