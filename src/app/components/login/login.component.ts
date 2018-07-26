import { Component, OnInit } from '@angular/core';
import { CREDENTIALS } from '../../config/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username;
  public password;

  public access: boolean = false;

  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("auth")){
      this.username = sessionStorage.getItem("auth");
      this.access = true;
    }
  }

  login(){

    
    
    if( this.username === CREDENTIALS.user && this.password === CREDENTIALS.password){
      console.log('Puede pasar');
      this.access = true;
      sessionStorage.setItem('auth', this.username);
      window.location.assign('#/admin');
    }else{
      console.log('No puede pasar');
      
    }
    
    
  }

}
