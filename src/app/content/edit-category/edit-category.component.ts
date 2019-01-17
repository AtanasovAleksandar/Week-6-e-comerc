import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { CountService } from 'src/app/count.service';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  customerId: Number;
  name: Category[];
  selectedOption:any;

  constructor(public categoryService: CategoriesService,
    public countService: CountService,
    public activatedRout: ActivatedRoute,
    public router: Router) {

    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.customerId = parseInt(params.id);
    });
    this.getCategory();
  }

  ngOnInit() {
    this.countService.getCount();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.Category = data;
        this.getEditCategory()
      }
    )
  }

  getEditCategory() {
    let oldVal:Category[];
    oldVal = this.Category[this.customerId];

    this.name = oldVal.name;
    this.selectedOption = oldVal.parentCategoryId;


  }

  editCategoty() {
    this.categoryService.editCategory(as).subscribe()
  }



}
