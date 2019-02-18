import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  product: Product = {} as Product
  prodID:number;
  detail:boolean = false;
  isAvailable :string = ''

  constructor(public productService:ProductsService,
    public activatedRout: ActivatedRoute,
    public router: Router,) { }

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params)
      this.prodID = parseInt(params.id);
     });
    this.getProduct();
  }

  getProduct() {
    this.productService.getDetailProduct(this.prodID).subscribe(
      data => {
        this.product = data;
        console.log(data);
      }
    )
  }

  @Output() changeActive = new EventEmitter<boolean>();

  goBack() {
    this.changeActive.emit( this.detail )
  }

}
