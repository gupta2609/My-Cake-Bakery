import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { SortserviceService } from '../sortservice.service';
import { faSignOut,faSignIn } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import{ faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faSignOut=faSignOut
  faSignIn=faSignIn
  faSearch=faSearch
  faShoppingCart=faShoppingCart
  searchtext:any
  color:any
  length:any
  isloggedin:any
  isAdmin:any = false
  adminUsers:any = ["guptahari2609@gmail.com"]

  constructor(private service:SortserviceService , private router:Router){
    this.isloggedin = localStorage["token"]?true:false
    if(this.isloggedin){
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
            this.length =  response.data?.length
         }
      })
   }
}

ngDoCheck(){
  if(localStorage["token"]){
     this.isloggedin = true
     if(this.adminUsers.includes(localStorage["loggedinUser"])){
      this.isAdmin = true
   }
  }
  else{
     this.isloggedin =  false
     this.isAdmin = false
  }
}

  search(){
    if(this.searchtext)
    this.router.navigate(["/search"], {queryParams:{q:this.searchtext}})
 }
 logout()

    {

        this.isloggedin=false

        localStorage.clear()
        this.router.navigate(["/"])

    }
}
