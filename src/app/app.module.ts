import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ProductsCategoryComponent } from './components/products/products-category/products-category.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { AngularFireModule } from 'angularfire2';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { EditComponent } from './components/products/edit/edit.component';
import { PortalLayoutComponent } from './components/portal-layout/portal-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    ProductsCategoryComponent,
    NavBarComponent,
    EditCategoryComponent,
    AddProductsComponent,
    EditComponent,
    PortalLayoutComponent
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
      progressBar: true,
      progressAnimation: 'increasing'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
