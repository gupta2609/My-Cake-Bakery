import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp1';
  name = 'NGX-UI-LOADER';

  constructor(private ngxService:NgxUiLoaderService,private http:HttpClient){}

  ngOnInit(){
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 1500);
    this.ngxService.startBackground("do-background-things");
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01");
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01");
    }, 1500);
  }
}
