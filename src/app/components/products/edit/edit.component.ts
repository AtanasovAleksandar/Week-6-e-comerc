import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  productId: number;
  product: Product = {} as Product;
  downloadSrc: string;

  constructor(public activatedRout: ActivatedRoute,
    public router: Router,
    public productService: ProductsService) {}

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.productId = parseInt(params.id);
    });
    this.getProduct()
}

getProduct() {
  this.productService.getProducts().subscribe(
    data => {
      this.product = data[this.productId];
      console.log(this.product)
      this.downloadSrc = this.product.imageUrl;
    }
  )
} 



}
