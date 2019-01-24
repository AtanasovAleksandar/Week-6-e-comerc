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
  customerId: any;
  name: Category[];
  selectedOption:any;
  Category: any;
  newName: Category[];
  newParent: any;
  newCategories: any = {}
  categoryObj: any;
  textDescription: any;
  newTextDescription: Category[];

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
        this.categoryObj = data[this.customerId]
        this.getEditCategory()
      }
    )
  }

  getEditCategory() {
    let oldVal:Category[];
    oldVal = this.Category[this.customerId];
    this.textDescription = oldVal.description;
    this.name = oldVal.name;
    this.selectedOption = oldVal.parentCategoryName;
  }

  editedValues() {
    this.newName = this.name;
    this.newParent = this.selectedOption;
    this.newTextDescription = this.textDescription
    this.newCategories.name = this.newName;
    this.newCategories.parentCategoryName =this.newParent.name;
    this.newCategories.parentCategoryId =this.newParent.id;
    this.newCategories.description = this.newTextDescription;
    console.log(this.newCategories);
    this.editCategory();
  }

  editCategory() {
    this.categoryService.editCategory(this.categoryObj.id,this.newCategories).subscribe(
      data => {
        this.router.navigate(['Category']);
      }
    )
  }

  
}
