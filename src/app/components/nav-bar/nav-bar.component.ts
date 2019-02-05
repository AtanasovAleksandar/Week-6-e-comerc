import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { CountService } from 'src/app/services/count.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  countCategory: number;
  count: any;
  active: boolean = false;
  countProducts: number;

  constructor(public categoriesService: CategoriesService,
    public countService: CountService) { }

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
  }

}

