import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/icategories';
import { CategoriesService } from 'src/app/categories.service';
import { CountService } from 'src/app/count.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  Category: Object = [];
  activeSearch: Boolean = false;
  searchName: string;
  activeDelete: boolean = false;

  constructor(public categoriesService: CategoriesService,
    public countService: CountService) {
    this.getCategories()
  }

  ngOnInit() {
    this.countService.getCount()
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

  deleteCategory(id, confirm) {
    this.activeDelete = true;
    if (confirm == 'YES') {
      this.categoriesService.deleteCategory(id).subscribe(
        data => {
          this.getCategories();
          this.countService.getCount()
        }
      )
      this.activeDelete = false;
    } else if (confirm == 'NO') {
      this.activeDelete = false;
    }
  }

  searchCategory() {
    if (this.searchName) {
      this.categoriesService.searchByName(this.searchName).subscribe(
        data => {
          this.Category = data;
          this.activeSearch = true;
        })
        
    } else if (this.searchName == '') {
      this.getCategories();
    }
  }
}
