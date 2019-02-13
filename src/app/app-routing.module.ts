import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ProductsCategoryComponent } from './components/products/products-category/products-category.component';

import { PortalLayoutComponent } from './components/portal-layout/portal-layout.component';
import { AddEditCategoryComponent } from './components/add-edit/add-edit.component';
import { AddEditProductsComponent } from './components/products/add-edit-products/add-edit-products.component';
import { DetailViewComponent } from './components/portal-layout/detail-view/detail-view.component';

const routes: Routes = [
  {path: 'Category'  , children: [
    {path: '' , component: ListCategoryComponent },
    {path: ':active/:id' , component: AddEditCategoryComponent},
    {path: ':active' , component: AddEditCategoryComponent },
  ] },
  {path: 'Products' , children: [
    {path: '' , component: ProductsCategoryComponent },
    {path: ':active/:id/:photoName' , component: AddEditProductsComponent },
    {path: ':active' , component: AddEditProductsComponent },
  ] },
  {path: 'Portal' , children: [
    {path: '' , component: PortalLayoutComponent },
    {path: ':DetailView/:id' , component: DetailViewComponent },
  ]  },

  {path: '' , redirectTo: "Category" , pathMatch: 'full'},
  {path: '**' , redirectTo: "Category" , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
