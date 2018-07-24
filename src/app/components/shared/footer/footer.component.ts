import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../../../database/api.service';
import { Contact } from '../../../models/contact';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public cargando:boolean = false;

  constructor( private api:APIService ) { }
  
  ngOnInit() {
  }

  onContact(Form:NgForm){
    const email = Form.value.email;
    const exp = Form.value.exp;
    let contact:Contact;
    if(email !== "" && exp !== ""){
      this.cargando = true;
       contact = {
        email:email,
        exp:exp,
        date:moment().format("YYYY-MM-DD")
       }          
       this.api.addContact(contact)
       .then(success =>{
         this.api.getPath('contact',success.id).update({id:success.id});
        setTimeout(() => {
          this.cargando = false;
        }, 4000);
       })
       .catch(err =>{
         console.error(err);
       });
    }
  }

}
