import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './content/list-category/list-category.component';
import { ProductsCategoryComponent } from './content/products-category/products-category.component';
import { AddCategoryComponent } from './content/add-category/add-category.component';

const routes: Routes = [
  {path: 'Category' , component: ListCategoryComponent },
  {path: 'Add-Category' , component: AddCategoryComponent },
  {path: 'Products' , component: ProductsCategoryComponent },
  {path: '' , redirectTo: "Customers/1/none" , pathMatch: 'full'},
  {path: '**' , redirectTo: "Customers/1/none" , pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
