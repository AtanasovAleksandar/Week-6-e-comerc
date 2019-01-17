import { Injectable } from '@angular/core';

declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  Success(title:string, message?:string) {
    toastr.success(title,message);
  }

  Warning(title:string, message?:string) {
    toastr.warning(title,message);
  }

  Error(title:string, message?:string) {
    toastr.error(title,message);
  }

  Info(title:string, message?:string) {
    toastr.info(message);
  }
  
}
