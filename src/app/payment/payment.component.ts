import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SortserviceService } from '../sortservice.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  userdetails: any;
  totalPrice: any;
  cakes: any;
  orderdetails: any = {};
  faArrowLeft=faArrowLeft

  constructor(
    private mainservice: SortserviceService,
    private http: HttpClient
  ) {
    let cartDetails = this.mainservice.sendCartDetails();

    this.userdetails = this.mainservice.sendUserDetails();

    this.totalPrice = cartDetails.totalPrice;
    this.cakes = cartDetails.cartitems;

    console.log('CART DETAILS', cartDetails);
  }

  placeorder() {
    var url = 'https://apifromashu.herokuapp.com/api/addcakeorder';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakes: this.cakes,
      price: this.totalPrice,
      name: this.userdetails.name,
      address: this.userdetails.address,
      city: this.userdetails.city,
      pincode: this.userdetails.pincode,
      phone: this.userdetails.phone,
    };
    this.mainservice.placeOrder(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from add cake order api', response);
        this.orderdetails = response.order;
      },
      error: (error: any) => {
        console.log('Error from place order api', error);
      },
    });
  }

  ngOnInit(): void {}
}
