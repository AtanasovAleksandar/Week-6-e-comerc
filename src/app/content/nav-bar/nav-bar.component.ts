import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { CountService } from 'src/app/count.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  countCategory: number;
  count: any;
  active: boolean = false;

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

