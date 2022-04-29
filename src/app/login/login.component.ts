import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SortserviceService } from '../sortservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userdetails:any={}
  responseError:any

  login(){
    var url="https://apifromashu.herokuapp.com/api/login"
    this.http.post(url,this.userdetails).subscribe({
      next:(response:any)=>{
        console.log("response fron login api",response)
        if(response.token){
          localStorage["token"] = response.token
          localStorage["loggedinUser"] =  response.email
          var url = "https://apifromashu.herokuapp.com/api/cakecart"
          var headers = new HttpHeaders()
          headers = headers.append("authtoken",localStorage["token"])
          var body = {}
          var options = {
             headers:headers
          }
          this.service.getCartItems(url,body,options).subscribe({
             next:(response:any)=>{
                console.log("response from cart items api in navbar", response)
                this.service.cartitems = response.data
                
             }
          })
          this.router.navigate(["/"]).then(()=>{
            window.location.reload()
          })
        }
        else{
          this.responseError = "Invalid Login"
        }
      },
      error:(error)=>{
        console.log("Error from login api",error)
      }
    })
  }

  constructor(private http:HttpClient,private router:Router,private service:SortserviceService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

}
