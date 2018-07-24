import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { News } from '../models/news';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private afs: AngularFirestore) { }

  //Read
  getGenres(): Observable<any> {
    return this.afs.collection('genre').valueChanges();
  }

  getContacts(): Observable<any> {
    return this.afs.collection('contact', ref => ref.orderBy("date", "desc").limit(20)).valueChanges();
  }

  getNews() {
    return this.afs.collection('news').valueChanges();
  }

  getProducts() {
    return this.afs.collection('products').valueChanges();
  }

  getColors():Observable<any>{
    return this.afs.collection('colors').valueChanges();
  }

  getType():Observable<any>{
    return this.afs.collection('type').valueChanges();
  }

  getBrand():Observable<any>{
    return this.afs.collection('brand').valueChanges();
  }

  getPath(collection, id): AngularFirestoreDocument {
    return this.afs.collection(collection).doc(id);
  }

  getTopics():Observable<any>{
    return this.afs.collection('topic').valueChanges();
  }

  _getLastProducts():Observable<any>{
     return this.afs.collection('products', ref => ref.orderBy("date", "desc").limit(10)).valueChanges();
  }

  _getLastNews():Observable<any>{
     return this.afs.collection('news', ref => ref.orderBy("date", "desc").limit(7)).valueChanges();
  }

  //Update

  UpdateNews(news:News) {
    this.afs.collection('news').doc(news.id).update(Object.assign({},news));
  }

  UpdateProducts(product:Product) {
    this.afs.collection('products').doc(product.id).update(Object.assign({},product));
  }

  //Create
  addContact({ email, exp, date }): Promise<any> {
    const path = this.afs.collection('contact');
    return path.add({ email: email, exp: exp, date: date });
  }

  addBrand({name}) {
    this.afs.collection('brand').add({name:name})
      .then(val => {
        this.getPath('brand',val.id).update({id:val.id});
      })
      .catch(err => {
        console.error(err);

      });
  }

  addColor({name}) {
    this.afs.collection('colors').add({name:name})
      .then(val => {
        this.getPath('colors',val.id).update({id:val.id});
      })
      .catch(err => {
        console.error(err);

      });
  }

  addType({name}) {
    this.afs.collection('type').add({name:name})
      .then(val => {
        this.getPath('type',val.id).update({id:val.id});
      })
      .catch(err => {
        console.error(err);

      });
  }

  addTopic({name}) {
    this.afs.collection('topic').add({name:name})
      .then(val => {
        this.getPath('topic',val.id).update({id:val.id});
      })
      .catch(err => {
        console.error(err);

      });
  }

  addProduct(product:Product){
    this.afs.collection('products').add(Object.assign({},product))
      .then(val => {
        this.getPath('products',val.id).update({id:val.id});
      })
      .catch(err => {
        console.error(err);

      });
  }

  addNews(news:News){
    this.afs.collection('news').add(Object.assign({},news))
      .then(val => {
        this.getPath('news',val.id).update({id:val.id});
      })
      .catch(err => {
        console.error(err);

      });
  }


  //Delete
  deleteContact(id: string): Promise<any> {
    if(confirm('¿está seguro de esta accioón?')){
    return this.afs.collection('contact').doc(id).delete();}
  }

  deleteBrand(id: string): Promise<any> {
    if(confirm('¿está seguro de esta accioón?')){
    return this.afs.collection('brand').doc(id).delete();}
  }

  deleteType(id: string): Promise<any> {
    if(confirm('¿está seguro de esta accioón?')){
    return this.afs.collection('type').doc(id).delete();}
  }

  deleteColor(id: string): Promise<any> {
    if(confirm('¿está seguro de esta accioón?')){
    return this.afs.collection('colors').doc(id).delete();}
  }

  deleteProduct(id:string): Promise<any>{
    if(confirm('¿está seguro de esta accioón?')){
    return this.afs.collection('products').doc(id).delete();}
  }

  deleteTopic(id:string): Promise<any>{
    if(confirm('¿está seguro de esta accioón?')){
      return this.afs.collection('topic').doc(id).delete();  }
  }

  deleteNew(id:string): Promise<any>{
    if(confirm('¿está seguro de esta accioón?')){
  return this.afs.collection('news').doc(id).delete();  }
  }
}
