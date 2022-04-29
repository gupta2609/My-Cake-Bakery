import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortserviceService } from '../sortservice.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cakedetail',
  templateUrl: './cakedetail.component.html',
  styleUrls: ['./cakedetail.component.css']
})
export class CakedetailComponent implements OnInit {

  cakeid : any
  cake:any = {}
  isAdding:any = false
  constructor(private route : ActivatedRoute , private service:SortserviceService,private ngxService:NgxUiLoaderService , private router:Router) {
    this.cakeid = this.route.snapshot.params["cakeid"]
    //api hit
    var url = "https://apifromashu.herokuapp.com/api/cake/" + this.cakeid
    this.service.getCakedetails(url).subscribe({
      next:(response:any)=>{
        console.log("Response from cake details api", response)
        this.cake = response.data
      },
      error:(error:any)=>{
        console.log("Error from cake details api" , error)
      }
    })
    
   }

   addToCart(){
     if(localStorage["token"]){
       this.isAdding = true
        let myheaders = new HttpHeaders()
        myheaders = myheaders.append("authtoken" , localStorage["token"])
        var url = "https://apifromashu.herokuapp.com/api/addcaketocart"
        var options = {
        headers:myheaders
        }
        var body = {
           cakeid:this.cake.cakeid,
           name:this.cake.name,
           weight:this.cake.weight,
           price:this.cake.price,
           image:this.cake.image,
          }
        this.service.addCakeToCart(url,body,options).subscribe({
          next:(response:any)=>{
          console.log("Response from add to cart api" , response)
          if(response.data){
            this.router.navigate(["/cart"]).then(()=>{
              window.location.reload();
            })
          }
        },
        error:(error:any)=>{
          console.log("Error from add to cart api" , error)
        }
        })
      }
      else{
        this.router.navigate(["/login"])
      }
    
  }
  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 2000);
    this.ngxService.startBackground("do-background-things");
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01");
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01");
    }, 2000);
  }
}
