import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { CountService } from 'src/app/services/count.service';
import { Category } from '../../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-edit-category',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  activeCategory: number;
  name: string;
  selectedOption: Category = {} as Category;
  Category: Category[];
  newName: string;
  newParent: Category = {} as Category
  newCategory: Category = {} as Category;
  categoryObj: Category = {} as Category
  textDescription: string;
  newTextDescription: string;
  activePage: string;
  emptyInput: boolean = false;
  category: Category = {} as Category;
  title: string;
  parent: number;
  activePageAction: boolean = false;

  constructor(public categoryService: CategoriesService,
    public countService: CountService,
    public activatedRout: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.activeCategory = parseInt(params.id);
      this.activePage = params.active
      this.getCategory();
      this.countService.getCount();
      this.countService.getProductCount();
     
    });
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.Category = data;
        this.categoryObj = data[this.activeCategory]
        if (this.activePage == 'Add') {
          this.title = ' Add';
          this.activePageAction = true
        } else {
          this.title = ' Edit';
          this.activePageAction = false;
          this.getValuesToInputs();
        }
      }
    )
  }

  checkActivePage() {
    if (this.activePage == 'Add') {
      this.addCategory();
      console.log('Add')
    } else {
      this.editedValues();
      console.log('Edit')
    }
  }

  addCategory() {
    if (!this.category.name) {
      this.emptyInput = true;
      this.toastr.error('required field');
    } else {
      this.emptyInput = false;
      this.category.parentCategoryName = this.selectedOption.name;
      this.category.parentCategoryId = this.selectedOption.id;
      this.categoryService.addNewCategory(this.category).subscribe(
        (data: Category[]) => {
          console.log(data);
          this.sentCount()
          this.router.navigate(['Category','ct']);
          this.toastr.success('Category Added');
        }
      )
    }
  }
  sentCount() {
    this.countService.getCount()
  }

  getValuesToInputs() {
    this.category.name = this.categoryObj.name;
    this.category.description = this.categoryObj.description
    for (let i = 0; i < this.Category.length; i++) {
        if (this.categoryObj.parentCategoryName == this.Category[i].name) {
          this.parent = i;
        }
    }
    this.selectedOption = this.Category[this.parent]
  }

  editedValues() {
    this.category.parentCategoryId = this.selectedOption.id
    this.category.parentCategoryName = this.selectedOption.name
    console.log(this.newCategory);
    this.editCategory();
  }

  editCategory() {
    this.categoryService.editCategory(this.categoryObj.id, this.category).subscribe(
      data => {
        this.router.navigate(['Category','ct']);
        this.toastr.success('Category Changed');
      }
    )
  }


}
