import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit {

  activePage: string;
  searchName: string;
  param: string;
  navTitle: string;

  constructor(public activeRouter: ActivatedRoute,
    public router: Router, ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
      console.log(params);
      this.param = params.activeR
    });
    if (this.param == 'ct') {
      this.navTitle = 'Category';
    } else {
      this.navTitle = 'Products'
    }
  }

  @Input() categoryName: string;
  

  navigate() {
    if (this.param == 'pr') {
      this.router.navigate(['Products/Add', 'Add-products']);
    } else {
      this.router.navigate(['Category/Add', 'Add-products']);
    }
  }

  @Output() searchEvent = new EventEmitter<string>();

  sentSearchName() {
    this.searchEvent.emit(this.searchName);
    this.searchName = '';
  }

}
