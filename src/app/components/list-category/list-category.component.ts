import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { CountService } from 'src/app/services/count.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from '../../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { NavAdminComponent } from '../Shared/nav-admin/nav-admin.component'
 
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit  {

  Category: Category[] = [];
  activeSearch: Boolean = false;
  searchName: string;
  activeDelete: boolean = false;
  activePage: number;
  currentId: number;
  parentObj:Object = { 'parentName': '' }
  activeRout: string;
  routeName: string;


  constructor(public categoriesService: CategoriesService,
    public countService: CountService,
    public activeRouter: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
      console.log(params);
      this.activePage = params.activePage;
      this.activeRout = params.activeR;
    });
    
    if(this.activeRout == 'ct') {
      this.routeName = 'Category';
    } else {
      this.routeName = 'Products';
    }



    this.getCategories()
    this.countService.getCount();
    this.countService.getProductCount();
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

  showDeleteModule(id) {
    this.activeDelete = true;
    this.currentId = id
  }

  showSuccess() {
    this.toastr.success('Category Deleted');
  }

  deleteCategory(confirm) {
    this.activeDelete = true;
    if (confirm == 'YES') {
      this.categoriesService.deleteCategory(this.currentId).subscribe(
        data => {
          this.getCategories();
          this.countService.getCount()
          this.showSuccess();
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
