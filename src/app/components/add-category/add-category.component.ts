import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Category } from '../../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { CountService } from 'src/app/services/count.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  allCategories: Category[] = [];
  selectedOption: any;
  category: Category = {} as Category;
  count: Number;
  emptyInput: boolean = false;

  constructor(public categoriesService: CategoriesService,
    public router: Router,
    private countService: CountService,
    private toastr: ToastrService) {
    this.getCategories()
    this.countService.getCount();
  }

  showSuccess() {
    this.toastr.success('Category Added');
  }

  showError() {
    this.toastr.error('required field');
  }

  getCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.allCategories = data;
      }
    )
  }

  addCategory() {
    if (!this.category.name) {
      this.emptyInput = true;
      this.showError();
    } else {
      this.emptyInput = false;
      this.category.parentCategoryName = this.selectedOption.name;
      this.category.parentCategoryId = this.selectedOption.id;
      this.categoriesService.addNewCategory(this.category).subscribe(
        (data: Category[]) => {
          console.log(data);
          this.sentCount()
          this.router.navigate(['Category']);
          this.showSuccess()
        }
      )
    }
  }
  sentCount() {
    this.countService.getCount()
  }



}






