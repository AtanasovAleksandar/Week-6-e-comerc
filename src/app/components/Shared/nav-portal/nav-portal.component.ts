import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmmitService } from 'src/app/services/emmit.service';
import { ProductsService } from 'src/app/services/products.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

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
    public emiteService: EmmitService,
    public productService: ProductsService,
    private previousRouteService: PreviousRouteService,
    ) { }

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

@Output() serName = new EventEmitter<string>();
  sentSearchName() {
    this.router.navigate(['/Portal', 'Home']);
    this.productService.searchByName(this.searchName).subscribe(
      data => {
        this.emiteService.getSearch(data)
        this.serName.emit(this.searchName);
      }
    )
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

  @Output() productsList = new EventEmitter<Object>();

 getProducts() {
  this.productService.getProducts().subscribe(
    data => {
      this.productsList.emit(data);
    }
  )
  };


  getAll(name) {
    this.emiteService.searchWord('');
    this.router.navigate(['/Portal', name]);
    this.emiteService.getAllHome(name)
  }



}
