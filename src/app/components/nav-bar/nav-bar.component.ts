import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { CountService } from 'src/app/services/count.service';

import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  countCategory: number;
  count: number;
  active: boolean = false;
  countProducts: number;
  url: string;
  categories: Category[] = [];
  activeRout: string;

  constructor(public categoriesService: CategoriesService,
    public countService: CountService,
    public categoryService: CategoriesService,
    public activeRouter: ActivatedRoute,
    public router: Router,) {}

  ngOnInit() {
    this.countService.cast.subscribe(
      count => {
        this.countCategory = count;
      })

    this.countService.castProducts.subscribe(
      countProducts => {
        this.countProducts = countProducts
      }
    )
    this.showCategories()
  }

  showCategories() {
   this.url = window.location.href;
   console.log(this.url)
   if (this.url == 'http://localhost:4200/Portal') {
     this.categoriesService.getAllCategories().subscribe(
       data => {
         this.categories = data;
         console.log(this.categories)
       }
     )
   }
  }

  

}

