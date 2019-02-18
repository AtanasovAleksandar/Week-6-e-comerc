import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPortalComponent } from './nav-portal.component';

describe('NavPortalComponent', () => {
  let component: NavPortalComponent;
  let fixture: ComponentFixture<NavPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
