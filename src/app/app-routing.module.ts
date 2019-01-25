import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ProductsCategoryComponent } from './components/products-category/products-category.component';


const routes: Routes = [
  {path: 'Category' , component: ListCategoryComponent },
  {path: 'Category/Edit/:id' , component: EditCategoryComponent },
  {path: 'Add-Category' , component: AddCategoryComponent },
  {path: 'Products' , component: ProductsCategoryComponent },
  {path: '' , redirectTo: "Category" , pathMatch: 'full'},
  {path: '**' , redirectTo: "Category" , pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
