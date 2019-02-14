import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit {

  activePage:string;
  searchName:string;

  constructor(public activeRouter: ActivatedRoute,
    public router: Router,) {}

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
      console.log(params);
      this.param = param.active
    });

  }

  @Input() categoryName:string;


  navigate() {
    if (this.param == 'pr') {
      this.router.navigate(['Products']);
    } else {
      this.router.navigate(['Category']);
    }
  }
}
