import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CountService } from 'src/app/services/count.service';
import { ToastrService } from 'ngx-toastr';

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
  quantity: number;
  cartItems: number;
  value: Object = {};
  itemInCart: boolean;
  quant: number;

  constructor(public productService: ProductsService,
    public activatedRout: ActivatedRoute,
    public router: Router,
    public countService: CountService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params)
      this.prodID = parseInt(params.id);
    });
    this.getProduct();
    this.getQuantity();
  }

  getQuantity() {
    let key = JSON.stringify(this.prodID)
    this.value = JSON.parse(localStorage.getItem(key));
    this.quantity = this.value[1];
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
    this.changeActive.emit(this.detail)
  }


  addToCart(item) {
    let key = item.id;
    let prodClick = item
    let itemsAdded = []
    itemsAdded.push(prodClick, this.quantity);
    let val = JSON.stringify(itemsAdded); // to string
    let keys = Object.keys(localStorage);
    console.log(keys);

    if (this.itemInCart) {
      this.value = JSON.parse(localStorage.getItem(key)); //to json and get 
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
    this.cartItems = localStorage.length;
    this.countService.getShoppingCartLength();
    this.detail = false;
    this.goBack();
  }
}


