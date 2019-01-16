import { Component, OnInit } from '@angular/core';
import { CountService } from '../count.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  countCategory: number;
  count: any;

  constructor(public categoriesService: CategoriesService,
    public countService: CountService) {
     
  }

  ngOnInit() {
    this.countService.cast.subscribe(
      count => {
        this.countCategory = count;
      })
  }

}
