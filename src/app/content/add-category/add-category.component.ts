import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { Router } from "@angular/router";
import { CountService } from 'src/app/count.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  name: Category[];

  allCategories: Category[] = [];
  selectedOption: Category[];
  textDescription: Category[];

  categories: any = {}
  count: Number;
  emptyInput: boolean = false;
  Parents: any = [];

  constructor(public categoriesService: CategoriesService,
    public router: Router, private countService: CountService) {
    this.getCategory()
  }

  getCategory() {
    this.categoriesService.getAllCategories().subscribe(
      data => {
        this.allCategories = data;
      }
    )
  }

  addCategory() {
    if (!this.name) {
      this.emptyInput = true;
    } else {
      this.emptyInput = false;
      this.categories.name = this.name;
      console.log(this.textDescription)
      this.categories.description = this.textDescription
      this.categories.parentCategoryName = this.selectedOption.name;
      this.categories.parentCategoryId = this.selectedOption.id;
      this.categoriesService.addNewCategory(this.categories).subscribe(
        data => {
          console.log(data);
          this.sentCount()
          this.router.navigate(['Category']);
        }
      )
    }
  }

  sentCount() {
    this.countService.getCount()
  }

  

}






