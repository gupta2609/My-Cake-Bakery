import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent {

  constructor(private router : Router){
  }

  @Input() cakedata:any
  showCakedetails(){
    this.router.navigate(['/detail',this.cakedata.cakeid])
  }
  addtocart(){
    this.router.navigate(['/detail',this.cakedata.cakeid])
  }
}
