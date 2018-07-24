/**
 * @fileOverview 
 * Aqui se importarán el género, la marca, el color y los precios
 */
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../database/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public genres:Observable<any>;
  public colors:Observable<any>;
  public brands:Observable<any>;

  constructor(private API:APIService) { }

  ngOnInit() {
    this.genres = this.API.getGenres();
    this.colors = this.API.getColors();
    this.brands = this.API.getBrand();
  }

}
