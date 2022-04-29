import { Component, OnInit } from '@angular/core';
import { SortserviceService } from '../sortservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchitems:any=[]

  constructor(private route:ActivatedRoute,private service:SortserviceService,private ngxService:NgxUiLoaderService) { 
    var searchtext = this.route.snapshot.queryParams["q"]
    var url = "https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
    this.service.searchCakes(url).subscribe({
      next:(response:any)=>{
          console.log("Response from search cakes api" , response)
          this.searchitems = response.data
      },
      error:(error:any)=>{
          console.log("error from search ckesa api" , error)
      }
    })
  }

  ngOnInit(): void {
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
