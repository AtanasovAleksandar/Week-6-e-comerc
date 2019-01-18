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


/*  

 <a class="nav-link float-left menu-link" [routerLink]="['Category']" routerLinkActive="active-selected">
              <i class="fas fa-folder-open"></i> Category <span class="badge badge-success">{{countCategory}}</span>
              <i class="float-right fas fa-angle-right"></i>
            </a>

 <a class="nav-link float-left menu-link" [routerLink]="['Products']" routerLinkActive="active-selected">
              <i class="fas fa-align-justify"></i> Products
              <i class="float-right fas fa-angle-right"></i>
            </a>


*/ 
 
