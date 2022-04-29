import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortserviceService } from '../sortservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userdetails:any={}
  users:any=[]
  responseError:any

  signup(){
    var url="https://apifromashu.herokuapp.com/api/register"
    this.service.signup(url,this.userdetails).subscribe({
      next:(response:any)=>{
        console.log("response from signup api",response)
        if(response.message=="User Already Exists"){
          this.responseError="Invalid Email or Email already taken"
        }
      },
      error:(error:any)=>{
        console.log("Error from singnup api",error)
      }
    })
    this.toastr.success('Registered Successfully','Verification Email Has been Sent')
    this.router.navigate(["/login"])
  }

  constructor(private service:SortserviceService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

}
