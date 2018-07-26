import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from './api.service';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class LocalSearchService {

  
  private dataSource:BehaviorSubject<any>;
  currentData:Observable<any>;

  constructor(private API:APIService) {  
    let data = [];
    this.API._getLastProducts().subscribe(docs=>{
      docs.forEach(element => {
          data.push(element);
      });
    });

    this.dataSource = new BehaviorSubject(data);
    this.currentData  = this.dataSource.asObservable();
  }

  changeData(products:Product[]){
     //const data = Observable.create(products); 
     this.dataSource.next(products);
  }

}
