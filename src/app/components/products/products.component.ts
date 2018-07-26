import { Component, OnInit } from '@angular/core';
import { APIService } from '../../database/api.service';
import { Observable } from '../../../../node_modules/rxjs';
import { Product } from '../../models/products';
import { News } from '../../models/news';
import { LocalSearchService } from '../../database/local-search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:Observable<any>;
  public news:Observable<News>;



  constructor(public API:APIService,public DATA:LocalSearchService) { }

  ngOnInit() {
    this.products = this.DATA.currentData;
    this.news = this.API._getLastNews();
  }

  loading(){
    console.log("hello");
    
  }
  

}
