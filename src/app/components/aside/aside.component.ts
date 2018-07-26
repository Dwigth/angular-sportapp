/**
 * @fileOverview 
 * Aqui se importarán el género, la marca, el color y los precios
 */
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../database/api.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/products';
import { LocalSearchService } from '../../database/local-search.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public genres: Observable<any>;
  public colors: Observable<any>;
  public brands: Observable<any>;
  public currentResult: Array<any>;

  private lastProperty: string;
  private properties: Array<any> = [];
  private searchResult: Array<Product> = [];


  constructor(private API: APIService, private DATA: LocalSearchService) { }

  ngOnInit() {
    this.genres = this.API.getGenres();
    this.colors = this.API.getColors();
    this.brands = this.API.getBrand();

    //Obtenemos los datos
    setTimeout(() => {
      this.API.getProducts()
        .subscribe(docs => {
          docs.forEach(doc => {
            const product = doc as Product;
            this.searchResult.push(product);
          });
        });
    }, 1000);
  }

  findBy(property: string, query: string) {
    // creo mi arreglo temporal donde guardaré el resultado de mi busquedas,
    // asignamos la ultima propiedad a buscar en una variable global,
    // verificamos que el arreglo de propiedades no supere los 3 elementos
    // si no tienen ningun elemento agregamos el resultado de la primer
    // propiedad
    let result = [];

    const tempProperty = this.properties.find((element) => { return element.property === property });

    if (tempProperty === undefined) {
      // console.log('no lo encontró');
      this.properties.push({property:property,query:query});
    }

    const length = this.properties.length;
    this.lastProperty = this.properties[length - 1];
    // console.log("Tamaño de arregli" + length);

    if (length <= 1) {
      result = this.searchResult.filter(element => element[property] === query);
      this.currentResult = result;
    }

    if (length > 1) {
      // console.log("Mayor a 2");
      let temp = [];        
        for (let index = 0; index < this.searchResult.length; index++) {
          const element = this.searchResult[index];
          if(length === 2){

            if(element[this.properties[0].property] === this.properties[0].query && 
              element[this.properties[1].property] === this.properties[1].query ){
                temp.push(element);
            }

          }else if(length === 3){
            if(element[this.properties[0].property] === this.properties[0].query && 
              element[this.properties[1].property] === this.properties[1].query &&
              element[this.properties[2].property] === this.properties[2].query){
                temp.push(element);
            }
          }
        }

        this.currentResult = temp;
      // console.log("Resultado: ", temp);
    }
    // console.log('Propiedades:', this.properties, `Resultados:`, result);
    this.DATA.changeData(this.currentResult);
  }

  searchByPrice(max:number){
    const length = this.properties.length;
    

    if (length > 1) {
      // console.log("Mayor a 2");
      let temp = [];        
        for (let index = 0; index < this.searchResult.length; index++) {
          const element = this.searchResult[index];
          if(length === 2){

            if(element[this.properties[0].property] === this.properties[0].query && 
              element[this.properties[1].property] === this.properties[1].query &&
              element.price <= max){
                temp.push(element);
            }

          }else if(length === 3){
            if(element[this.properties[0].property] === this.properties[0].query && 
              element[this.properties[1].property] === this.properties[1].query &&
              element[this.properties[2].property] === this.properties[2].query &&
              element.price <= max){
                temp.push(element);
            }
          }
        }

        this.currentResult = temp;
      // console.log("Resultado: ", temp);
    }else{

      let temp = this.currentResult.filter(ele => ele.price <= max);
      this.currentResult = temp;
    }
    this.DATA.changeData(this.currentResult);
  }
}
