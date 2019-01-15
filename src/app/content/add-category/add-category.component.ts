import { Component} from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { ICategories } from 'src/app/icategories';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  name:ICategories;

  categories:any = {'name': ''}


  constructor(public categoriesService: CategoriesService, public router: Router) { }

  addCategory() {
  this.categories.name = this.name
    this.categoriesService.addNewCategory(this.categories).subscribe(
      data => {
        console.log(data);

        this.router.navigate(['Category']);
      }
    )
  }

  

}
