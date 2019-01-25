import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { CountService } from 'src/app/services/count.service';
import { Category } from '../../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  customerId: number;
  name: string;
  selectedOption:any;
  Category: Category[];
  newName:string;
  newParent:Category = {} as Category
  newCategory: Category = {} as Category;
  categoryObj:Category = {} as Category
  textDescription: string;
  newTextDescription: string;

  constructor(public categoryService: CategoriesService,
    public countService: CountService,
    public activatedRout: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService ) {}

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.customerId = parseInt(params.id);
      this.getCategory();
      this.countService.getCount();
    });
  }

  showSuccess() {
    this.toastr.success('Category Changed');
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
    let oldVal:Category;
    oldVal = this.Category[this.customerId];
    this.textDescription = oldVal.description;
    this.name = oldVal.name;
    this.selectedOption = oldVal;
  }

  editedValues() {
    this.newName = this.name;
    this.newParent = this.selectedOption;
    this.newTextDescription = this.textDescription
    this.newCategory.name = this.newName;
    this.newCategory.parentCategoryName =this.newParent.name;
    this.newCategory.parentCategoryId =this.newParent.id;
    this.newCategory.description = this.newTextDescription;
    console.log(this.newCategory);
    this.editCategory();
  }

  editCategory() {
    this.categoryService.editCategory(this.categoryObj.id,this.newCategory).subscribe(
      data => {
        this.router.navigate(['Category']);
        this.showSuccess();

      }
    )
  }

  
}
