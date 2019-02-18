import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoShoppingCartComponent } from './promo-shopping-cart.component';

describe('PromoShoppingCartComponent', () => {
  let component: PromoShoppingCartComponent;
  let fixture: ComponentFixture<PromoShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
