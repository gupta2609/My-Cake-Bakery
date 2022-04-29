import { Component, OnInit } from '@angular/core';
import { SortserviceService } from '../sortservice.service';
import { HttpClient } from '@angular/common/http';
import { faSortAmountAsc} from '@fortawesome/free-solid-svg-icons'
import { faSortAmountDesc} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css']
})
export class CakelistComponent implements OnInit {

  faSortAmountAsc=faSortAmountAsc
  faSortAmountDesc=faSortAmountDesc


  asc(){
    this.cakes=this.sortservice.ascending(this.cakes)
  }
  desc(){
    this.cakes=this.sortservice.descending(this.cakes)
  }

  cakes:any=[]

  constructor(private sortservice:SortserviceService,private http:HttpClient) {

    var url="https://apifromashu.herokuapp.com/api/allcakes"
    this.http.get(url).subscribe({
      next:(response:any)=>{
        console.log("Response from allcakes api",response)
        this.cakes=response.data
      },
      error:(error)=>{
        console.log("Error from allcakes api",error)
      }
    })
   }

  ngOnInit(): void {
  }

}
