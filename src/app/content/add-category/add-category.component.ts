import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { ICategories } from 'src/app/icategories';
import { Router } from "@angular/router";
import { CountService } from 'src/app/count.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  name: ICategories;

  categories: any = { 'name': '' }
  count: Number;
  emptyInput: boolean = false;


  constructor(public categoriesService: CategoriesService,
    public router: Router, private countService: CountService) {
     
  }

  addCategory() {
    if (!this.name) {
      this.emptyInput = true;
      console.log('empty')
    } else {
      this.emptyInput = false;
      this.categories.name = this.name
      this.categoriesService.addNewCategory(this.categories).subscribe(
        data => {
          console.log(data);
          this.sentCount()
          this.router.navigate(['Category']);
        }
      )
    }
  }

  

  sentCount() {
    this.countService.getCount()
  }

}






