import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private afs:AngularFirestore) { }

  //Read
  getGenres():Observable<any>{
    return this.afs.collection('genre').valueChanges();
  }

  //Update

  //Create

  //Delete
}
