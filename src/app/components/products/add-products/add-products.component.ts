import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  file: File = null;

  constructor(public productService: ProductsService, private afStorage: AngularFireStorage) {}

  ngOnInit() {
  }

  onFileChanged(event) {
    const file = <File> event.target.files[0]
    this.file = file;
    console.log(this.file)
  }

  fileUpload() {
    this.afStorage.upload('/upload/to/this-path', this.file);
    }
  }


