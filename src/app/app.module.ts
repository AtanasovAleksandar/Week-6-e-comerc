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
import { ProductsCategoryComponent } from './components/products-category/products-category.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';




@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    ProductsCategoryComponent,
    NavBarComponent,
    EditCategoryComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: "toast-top-left",
      preventDuplicates: true,
      tapToDismiss: true,
      progressBar: true,
      progressAnimation: 'increasing'
      
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
