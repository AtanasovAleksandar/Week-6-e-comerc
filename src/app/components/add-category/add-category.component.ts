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

  name: string;

  allCategories: Category[] = [];
  selectedOption: any = 'No Parent';
  textDescription: string;

  categories: any = {};
  count: Number;
  emptyInput: boolean = false;


  constructor(public categoriesService: CategoriesService,
    public router: Router,
    private countService: CountService,
    private toastr: ToastrService) {
    this.getCategory()
    this.countService.getCount();
  }

  showSuccess() {
    this.toastr.success('Category Added');
  }

  showError() {
    this.toastr.error('required field');
  }

  getCategory() {
    this.categoriesService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.allCategories = data;
      }
    )
  }

  addCategory() {
    if (!this.name) {
      this.emptyInput = true;
      this.showError();
    } else {
      this.emptyInput = false;
      this.categories.name = this.name;
      console.log(this.textDescription)
      this.categories.description = this.textDescription
      this.categories.parentCategoryName = this.selectedOption.name;
      this.categories.parentCategoryId = this.selectedOption.id;
      this.categoriesService.addNewCategory(this.categories).subscribe(
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






