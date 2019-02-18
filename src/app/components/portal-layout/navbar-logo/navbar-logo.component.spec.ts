import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogoComponent } from './navbar-logo.component';

describe('NavbarLogoComponent', () => {
  let component: NavbarLogoComponent;
  let fixture: ComponentFixture<NavbarLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
