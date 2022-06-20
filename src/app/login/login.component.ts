import { Component, OnInit } from '@angular/core';
import {FetchDetailsServiceService} from '../fetch-details-service.service';
import {SpinnerService} from '../SpinnerService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  activeSpinner: boolean = false;

  constructor(private service: FetchDetailsServiceService, private spinnerService : SpinnerService) { 
     this.spinnerService.spinnerActive.subscribe(active => 
     this.toggleSpinner(active)); 
  }

  ngOnInit(): void {
  }

  login() {
    //this.service.
    // this.spinnerService.activate();
    // setTimeout(() => {
     
      
    // }, 5000);
    this.service.loginService(this.username, this.password);
  }

   toggleSpinner(active){
      this.activeSpinner = active
    }

}
