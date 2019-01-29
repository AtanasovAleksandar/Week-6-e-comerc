import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {
  AngularFireStorage,
  AngularFireStorageReference, AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<void>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  downloadLink: Object;
  complite: any;

  constructor(public http: HttpClient, public productService: ProductsService, private afStorage: AngularFireStorage) { }

  ngOnInit() {
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => this.getUrl(s.metadata) ));
    this.uploadProgress = this.task.percentageChanges();
     
      // this.downloadURL = this.ref.getDownloadURL();
    //   console.log(this.downloadURL)
    //  const link = this.ref.child(id).getDownloadUrl().then(function(url) {
    //    console.log(url)
    //  });

    // this.ref.snapshot.ref.getDownloadURL().then(downloadURL => {
    //   console.log('File available at', downloadURL);
    //   fileUpload.url = downloadURL;
    //   fileUpload.name = fileUpload.file.name;
    //   this.saveFileData(fileUpload);
    // });
  }

  getUrl(s) {
    if (s != null) {
      this.downloadURL = this.ref.getDownloadURL();
    }
  }

    // Create a reference to the file we want to download
    // if (this.uploadProgress) {
    //   var starsRef = this.ref.child(id);

    //   // Get the download URL
    //   starsRef.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
  //     });
  //   }
  // }
}


