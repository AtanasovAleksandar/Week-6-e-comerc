import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { ProductsCategoryComponent } from './components/products/products-category/products-category.component';
import { AngularFireModule } from 'angularfire2';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { PortalLayoutComponent } from './components/portal-layout/portal-layout.component';
import { AddEditCategoryComponent } from './components/add-edit/add-edit.component';
import { AddEditProductsComponent } from './components/products/add-edit-products/add-edit-products.component';
import { DetailViewComponent } from './components/portal-layout/detail-view/detail-view.component';
import { ShoppingCartComponent } from './components/portal-layout/shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    ListCategoryComponent,
    ProductsCategoryComponent,
    NavBarComponent,
    AddEditCategoryComponent,
    AddEditProductsComponent,
    PortalLayoutComponent,
    DetailViewComponent,
    ShoppingCartComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyBUPX_ojArU2BbY0OwNQ0NNSkqPk_hQ60M",
    authDomain: "usermenagment.firebaseapp.com",
    databaseURL: "https://usermenagment.firebaseio.com",
    projectId: "usermenagment",
    storageBucket: "usermenagment.appspot.com",
    messagingSenderId: "652864676256"
    }),
    AngularFireStorageModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: "toast-top-left",
      preventDuplicates: true,
      tapToDismiss: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
