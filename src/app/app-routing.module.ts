import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ProductsCategoryComponent } from './components/products/products-category/products-category.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { EditComponent } from './components/products/edit/edit.component';
import { PortalLayoutComponent } from './components/portal-layout/portal-layout.component';
import { AddEditCategoryComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [
  {path: 'Category'  , children: [
    {path: '' , component: ListCategoryComponent },
    {path: ':active/:id' , component: AddEditCategoryComponent},
    {path: ':active' , component: AddEditCategoryComponent },
  ] },
  {path: 'Products' , children: [
    {path: '' , component: ProductsCategoryComponent },
    {path: ':Edit/:id/:photoName' , component: EditComponent },
    {path: ':Add' , component: AddProductsComponent },
  ] },
  {path: 'Portal' , component: PortalLayoutComponent },
  {path: '' , redirectTo: "Category" , pathMatch: 'full'},
  {path: '**' , redirectTo: "Category" , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
