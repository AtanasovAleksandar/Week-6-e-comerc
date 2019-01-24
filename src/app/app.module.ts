import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './content/add-category/add-category.component';
import { ListCategoryComponent } from './content/list-category/list-category.component';
import { ProductsCategoryComponent } from './content/products-category/products-category.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditCategoryComponent } from './content/edit-category/edit-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

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
