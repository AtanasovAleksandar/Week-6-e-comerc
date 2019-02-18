import { Component, OnInit, Input } from '@angular/core';
import { CountService } from 'src/app/services/count.service';

@Component({
  selector: 'app-promo-shopping-cart',
  templateUrl: './promo-shopping-cart.component.html',
  styleUrls: ['./promo-shopping-cart.component.scss']
})
export class PromoShoppingCartComponent implements OnInit {
  cartItems: number = 0;

  constructor(public countService: CountService) { }

  ngOnInit() {
    this.cartItems = localStorage.length;
    this.countService.getShoppingCartLength();
    this.countService.castShoppingCart.subscribe(
      cartL => {
        this.cartItems = cartL;
      }
    )
  }

  // @Input() cartItemsLength:number;

}
