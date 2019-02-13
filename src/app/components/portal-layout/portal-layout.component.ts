import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss'],
  encapsulation: ViewEncapsulation.None 
})

export class PortalLayoutComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  searchName:string;
  searchActive:boolean = false;
  notFound: boolean = false;
  mainMenu: Product[] = [];

  constructor(public productService: ProductsService,
    public categoryService: CategoriesService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategory();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
        this.searchActive = false;
        console.log(data)
      }
    )
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
        this.mainMenu = data.slice(0, 5);
      }
    )
  }

  searchProducts() {
    this.productService.searchByName(this.searchName).subscribe(
      data => {
        this.products = data;
        this.searchActive = true;
        this.notFound = false;
        if (this.searchName == '') {
          this.notFound = true;
        }
      }
    )

  }

}
