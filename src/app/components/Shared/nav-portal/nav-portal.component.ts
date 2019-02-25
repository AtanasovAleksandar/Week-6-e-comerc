import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmmitService } from 'src/app/services/emmit.service';

@Component({
  selector: 'app-nav-portal',
  templateUrl: './nav-portal.component.html',
  styleUrls: ['./nav-portal.component.scss']
})
export class NavPortalComponent implements OnInit {

  categories: Category[] = [];
  searchName: string;
  mainMenu: Product[] = [];

  constructor(public categoryService: CategoriesService,
    public activatedRout: ActivatedRoute,
    public router: Router,
    public emiteService: EmmitService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data.slice(5);
        this.mainMenu = data.slice(0, 5);
      }
    )
  }

  @Output() navigation = new EventEmitter<string>();



  checkInput() {
    if (this.searchName == '') {
      this.searchName = '';
      this.sentSearchName();
    }
  }


  sentSearchName() {
    this.router.navigate(['/Portal', 'Home']);
   this.emiteService.searchWord(this.searchName);
  }

  checkCategory(id, name) {
    this.emiteService.searchWord('');
    this.router.navigate(['/Portal', name]);
    this.emiteService.categoryNameActive(name);
    this.emiteService.getActiveParentCategory(id)
    this.navigation.emit(id);
    id = 0;
    name = 'Home';
    
  }



  getAll(name) {
    this.emiteService.searchWord('');
    this.router.navigate(['/Portal', name]);
    this.emiteService.getAllHome(name)
  }



}
