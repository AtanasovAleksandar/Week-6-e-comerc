import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ProductsCategoryComponent } from './components/products/products-category/products-category.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { EditComponent } from './components/products/edit/edit.component';

const routes: Routes = [
  {path: 'Category' , component: ListCategoryComponent },
  {path: 'Category/Edit/:id' , component: EditCategoryComponent },
  {path: 'Add-Category' , component: AddCategoryComponent },
  {path: 'Products' , component: ProductsCategoryComponent },
  {path: 'Products/Edit/:id' , component: EditComponent },
  {path: 'Products/Edit/:id/:photoName' , component: EditComponent },
  {path: 'Add-Products' , component: AddProductsComponent },
  {path: '' , redirectTo: "Category" , pathMatch: 'full'},
  {path: '**' , redirectTo: "Category" , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
