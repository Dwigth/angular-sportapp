import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../database/api.service';
import { Product } from '../../../models/products';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private DataProducts:Product[] = [];
  public  searchResult:Product[] = [];
  public  searching:boolean = false;
  public  show:boolean = false;
  public  message:string = "";

  constructor(private API:APIService) { }

  ngOnInit() {
    this.API.getProducts()
      .subscribe(docs =>{
        docs.forEach(doc =>{
          const product = doc as Product;
          this.DataProducts.push(product);
        });
      });
  }

  search(request:string){
    this.searchResult = [];
    request = request.toLowerCase();
    this.DataProducts.forEach(element => {
       if(element.type_id === request){
          this.searchResult.push(element);
       }
    });
    console.log(this.searchResult);
  }

  disable(){
    this.searching = true;

    setTimeout(() => {
      this.searching = false;
      if(this.searchResult.length > 1){
        this.message = "Los resultados de tu busqueda son: ";
        this.show = true;
      }else {
        this.message = "No se encontró lo que buscaba";
        this.show = false;
      }

    }, 2000);

  }



}
