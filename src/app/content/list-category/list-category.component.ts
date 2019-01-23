import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { CountService } from 'src/app/count.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from '../models/category.model';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  Category: Category[] = [];
  activeSearch: Boolean = false;
  searchName: string;
  activeDelete: boolean = false;
  activePage: any;
  currentId: any;
  Parents: any = [];
  parentObj = { 'parentName': '' }


  constructor(public categoriesService: CategoriesService,
    public countService: CountService,
    public activeRouter: ActivatedRoute,
    public router: Router,
  ) {
    this.activeRouter.params.subscribe(params => {
      console.log(params);
      this.activePage = params.activePage;
    });

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
        // this.getParent();
      }
    )
  }

  // getParent() {
  //   for (var i = 0; i < this.Category.length; i++) {
  //     var parentID = this.Category[i].parentCategoryId
  //     for (var j = 0; j < this.Category.length; i++) {
  //       if (parentID == this.Category[j].id) {
  //         var parentName = this.Category[j].name;
  //         this.parentObj.parentName = parentName;
  //         this.Parents.push(this.parentObj);
  //       }
  //     }
  //   }
  //   console.log(this.Parents)
  // }

  showDeleteModule(id) {
    this.activeDelete = true;
    this.currentId = id
  }

  deleteCategory(confirm) {
    this.activeDelete = true;
    if (confirm == 'YES') {
      this.categoriesService.deleteCategory(this.currentId).subscribe(
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
