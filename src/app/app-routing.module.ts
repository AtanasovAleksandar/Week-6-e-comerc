import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ProductsCategoryComponent } from './components/products/products-category/products-category.component';

import { PortalLayoutComponent } from './components/portal-layout/portal-layout.component';
import { AddEditCategoryComponent } from './components/add-edit/add-edit.component';
import { AddEditProductsComponent } from './components/products/add-edit-products/add-edit-products.component';
import { ShoppingCartComponent } from './components/portal-layout/shopping-cart/shopping-cart.component';
import { DetailViewComponent } from './components/portal-layout/detail-view/detail-view.component';

const routes: Routes = [
  {
    path: 'Category', children: [
      { path: ':activeR', component: ListCategoryComponent },
      { path: ':active/:id', component: AddEditCategoryComponent },
      { path: 'Add/:active', component: AddEditCategoryComponent },
    ]
  },
  {
    path: 'Products', children: [
      { path: ':activeR', component: ProductsCategoryComponent },
      { path: ':active/:id/:photoName', component: AddEditProductsComponent },
      { path: 'Add/:active', component: AddEditProductsComponent },
    ]
  },
  {
    path: 'Portal', children: [
      { path: ':id', component: PortalLayoutComponent },
      { path: 'list', component: PortalLayoutComponent },
      { path: 'Detail/:id', component: DetailViewComponent },
    ]
  },
  
  { path: 'Shopping-cart', component: ShoppingCartComponent },
  { path: '', redirectTo: "Portal/Home", pathMatch: 'full' },
  { path: '**', redirectTo: "Portal/Home", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
