import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  items: Object;
  productInCart = [];
  total: number = 0;
  quantity: number;
  message: string;

  constructor( public activatedRout: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.getItemsFromCart();
    this.quantity = this.productInCart[1]
    this.calculate();
  }


  getItemsFromCart() {
    var key;
    let keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
      key = keys[i]
      this.items = JSON.parse(localStorage.getItem(key));
      this.productInCart.push(this.items);
    }
    console.log(this.productInCart)
  }

  calculate() {
    this.message = 'Your news change well be lost if you live this page!';
    this.total = 0;
    for (let i = 0; i < this.productInCart.length; i++) {
      let price = this.productInCart[i][1] * this.productInCart[i][0].price;
      this.total += price;
    }
  }

  delete(id) {
    localStorage.removeItem(id);
    this.productInCart = [];
    this.getItemsFromCart();
    this.calculate()
  }

  checkOut() {
    localStorage.clear();
    this.router.navigate(['/Portal/Home']);
    this.toastr.success('You successfully pay for you products ! Wait for delivery');
  }

}
