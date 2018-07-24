import { Component, OnInit } from '@angular/core';
import { APIService } from '../../database/api.service';
import { Observable } from '../../../../node_modules/rxjs';
import { Product } from '../../models/products';
import { News } from '../../models/news';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:Observable<Product>;
  public news:Observable<News>;
  constructor(public API:APIService) { }

  ngOnInit() {
    this.products = this.API._getLastProducts();
    this.news = this.API._getLastNews();
  }

}
