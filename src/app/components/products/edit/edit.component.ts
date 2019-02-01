import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  productId: number;
  product: Product = {} as Product;
  downloadSrc: string;
  categories: Category[] = [];

  constructor(public activatedRout: ActivatedRoute,
    public router: Router,
    public productService: ProductsService,
    public categoriesService: CategoriesService) {}

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.productId = parseInt(params.id);
    });
    this.getProduct();
    this.getCategories();
}

getProduct() {
  this.productService.getProducts().subscribe(
    data => {
      this.categories = data
      this.product = data[this.productId];
      console.log(this.product)
      this.downloadSrc = this.product.imageUrl;
    }
  )
}

getCategories() {
  this.categoriesService.getAllCategories().subscribe(
    data => {
      this.categories = data;
    }
  )
}

productChange() {
  this.productService.editProduct(this.product,this.product.id).subscribe (
    data => {
      this.router.navigate(['Products']);
    }
  )
}



}
