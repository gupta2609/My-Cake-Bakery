import { Component, OnInit } from '@angular/core';
import { SortserviceService } from '../sortservice.service';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  faArrowLeft=faArrowLeft

  userdetails: any = {};

  constructor(private mainservice: SortserviceService) {}

  addAddress() {
    let userCheckoutDetails: any = {
      name: this.userdetails.name,
      address: this.userdetails.address,
      city: this.userdetails.city,
      pincode: this.userdetails.pincode,
      phone: this.userdetails.phone,
    };
    this.mainservice.getUserDataFromAddressComponent(userCheckoutDetails);
  }

  ngOnInit(): void {}

}
