import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CountService } from 'src/app/services/count.service';
import { ToastrService } from 'ngx-toastr';
import { EmmitService } from 'src/app/services/emmit.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  product: Product = {} as Product
  prodID: number;
  detail: boolean = false;
  isAvailable: string = ''
  quantity: number = 1;
  cartItems: number;
  value: Object = {};
  itemInCart: boolean;
  quant: number;
  error: boolean = false;

  constructor(public productService: ProductsService,
    public activatedRout: ActivatedRoute,
    public router: Router,
    public countService: CountService,
    public toastr: ToastrService,
    public emmitService: EmmitService) { }

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      this.prodID = parseInt(params.id);
    });
    this.getProduct();
    this.getQuantity();
  }

  getQuantity() {
    let key = JSON.stringify(this.prodID)
    this.value = JSON.parse(localStorage.getItem(key));
    if ( this.value != null) {
      this.quantity = this.value[1];
    }
   
  }

  getProduct() {
    this.productService.getDetailProduct(this.prodID).subscribe(
      data => {
        this.product = data;
        console.log(data);
      }
    )
  }


    checkInput(item) {
      if (this.quantity <= 0 || this.quantity == null) {
        this.error = true;
      }  else {
        this.error = false;
      }
    }


  addToCart(item) {
    this.emmitService.categoryNameActive('Home');
    let key = item.id;
    let prodClick = item
    let itemsAdded = []
    itemsAdded.push(prodClick, this.quantity);
    let val = JSON.stringify(itemsAdded); // to string
    let keys = Object.keys(localStorage);
    
    console.log(keys);

    if (this.itemInCart) {
      this.value = JSON.parse(localStorage.getItem(key)); //to json and get 
      console.log(this.value)
    }
    this.itemInCart = false;
    for (var i = 0; i < keys.length; i++) {  //check if already exists
      const keysCurrent = keys[i];
      console.log(key);
      if (key == parseInt(keysCurrent)) {
        this.itemInCart = true;
        this.quant = this.value[1];
      }
    }

    
    if (this.quantity <= 0 || this.quantity == null) {
      this.error = true;
    } else {
      this.error = false;
      this.detail = false;
      let changedQuantity = false;

    if (this.quantity != this.quant && this.itemInCart) {
      changedQuantity = true;
      this.toastr.success('You change quantity!');
    } else if (!this.itemInCart && this.quantity == 1) {
      this.toastr.success('You add new item to Cart');
    } else if (this.itemInCart && !changedQuantity) {
      this.toastr.info('This item is already in cart');
    } else if (!this.itemInCart && this.quantity > 1) {
      this.toastr.success('You add new item to Cart');
    }
      localStorage.setItem(key, val);
    }
    this.cartItems = localStorage.length;
    this.countService.getShoppingCartLength();
  }
}


