import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SortserviceService {

  userCheckoutDetails: any = {};
  cartDetails: any={};
  cartitems:any;

  ascending(data:any){
    data.sort((obj1:any,obj2:any)=>{
      return obj1.price-obj2.price
    })
    return data
  }

  descending(data:any){
    data.sort((obj1:any,obj2:any)=>{
      return obj2.price-obj1.price
    })
    return data
  }

  getCakedetails(url:any){
    return this.http.get(url)
  }

  getCartDataFromCartComponent(cartDetails: any) {
    this.cartDetails = cartDetails;
  }

  getUserDataFromAddressComponent(userdata: any) {
    this.userCheckoutDetails = userdata;
  }

  addCakeToCart(url:any,body:any , options:any){
    return this.http.post(url,body,options)

  }
  getCartItems(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  searchCakes(url:any){
    return this.http.get(url)
  }

  signup(url:any,data:any){
    return this.http.post(url,data)
  }
  changepassword(url:any,data:any){
    return this.http.post(url,data)
  }
  sendCartDetails() {   
    return this.cartDetails;
  }
  sendUserDetails() {
    return this.userCheckoutDetails;
  }

  placeOrder(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  removeOneCakefromCart(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  removeCakefromCart(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  getmyorders(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  uploadImage(url:any,body:any,options:any){
    return this.http.post(url,body,options)

  }

  constructor(private http:HttpClient) { }
}
