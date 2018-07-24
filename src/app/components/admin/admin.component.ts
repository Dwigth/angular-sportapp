import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { APIService } from '../../database/api.service';

import { Product } from '../../models/products';
import * as moment from 'moment';
import { News } from '../../models/news';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /**Public variables */
  public Contacts;
  public Genres;
  public Brands;
  public Colors;
  public Types;
  public Products;
  public News;
  public Topics;

  public editando: boolean = false;
  public loading: boolean = false;

  constructor(private API: APIService) { }

  ngOnInit() {    
    if(sessionStorage.getItem("auth") === null){
      window.location.assign('/home');
    }

    this.controlPanel();
    this.Init();
  }

  Init() {
    this.Contacts = this.API.getContacts();
    this.Genres = this.API.getGenres();
    this.Colors = this.API.getColors();
    this.Brands = this.API.getBrand();
    this.Types = this.API.getType();
    this.Products = this.API.getProducts();
    this.News = this.API.getNews();
    this.Topics = this.API.getTopics();
  }

  /**
   * 
   * @param Form Formulario de productos
   */
  onCreate(Form: NgForm) {
    const url = (<HTMLLinkElement>document.getElementById('href')).href;

    let product = new Product();
    product.name = Form.value.name;
    product.img = url;
    product.price = Form.value.price;
    product.brand_id = Form.value.brand;
    product.color_id = Form.value.color;
    product.genre_id = Form.value.cat;
    product.type_id = Form.value.type;
    product.date = moment().format("YYYY-MM-DD");
    this.API.addProduct(product);
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
     // location.reload();
    }, 500);
  }

  onCreateNew(Form:NgForm){
    const element = (<HTMLElement>document.getElementById('nnew')).children[2];
    const url = (<HTMLLinkElement>element).href;
    const BAD_URL: string = "http://localhost:4200/null";

    let news = new News();
    news.title = Form.value.title;
    news.img = url;
    news.body = Form.value.body;
    news.topic_id = Form.value.topic;
    news.date = moment().format("YYYY-MM-DD");
    this.API.addNews(news);
    this.loading = true;
    
    if(url !== BAD_URL){
    setTimeout(() => {
      this.loading = false;
      //location.reload();
    }, 1500);
    }else{
      alert('Al parecer hubo un error al cargar la imagen, redirigiendo...');
      this.loading = true;
      setTimeout(() => {      
      location.reload();
      }, 1000);
      
    }

  }

  /**
   * 
   * @param Form Formulario de edicion de productos
   */
  onEdit(Form: NgForm) {
    const url = (<HTMLLinkElement>document.getElementById('href')).href;
    const img = (<HTMLImageElement>document.getElementById('img')).src;
    const id = (<HTMLInputElement>document.getElementById('id')).value;
    const price = (<HTMLInputElement>document.getElementById('price')).value;
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const BAD_URL: string = "http://localhost:4200/null";

    let product = new Product();
    product.id = id;
    product.name = name;
    product.price = +price;
    product.brand_id = Form.value.brand;
    product.color_id = Form.value.color;
    product.genre_id = Form.value.cat;
    product.type_id = Form.value.type;
    product.date = moment().format("YYYY-MM-DD");


    if (url === undefined || url !== BAD_URL) {
      product.img = url;
    } else {
      product.img = img;
    }

    this.API.UpdateProducts(product);

    this.editando = false;
  }

  onEditNew(Form:NgForm){
    const element = (<HTMLElement>document.getElementById('neditst')).children[2];
    const url = (<HTMLLinkElement>element).href;

    const img = (<HTMLImageElement>document.getElementById('imgen')).src;
    const id = (<HTMLInputElement>document.getElementById('idn')).value;
    const body = (<HTMLInputElement>document.getElementById('body')).value;
    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const BAD_URL: string = "http://localhost:4200/null";
    const BAD_URLO: string = "http://localhost:4200/";


    let news = new News();
    news.id = id;
    news.title = title;
    news.body = body;
    news.topic_id = Form.value.topic;
    news.date = moment().format("YYYY-MM-DD");

    
    
    if (url === undefined || url !== BAD_URL && url !== BAD_URLO ) {
      news.img = url;
      console.log("malo");
      
    } else {
      news.img = img;
      console.log("Bueno");
      
    }
    console.log(news);
    this.API.UpdateNews(news);
    this.loading = true;
 
    this.editando = false;

    setTimeout(() => {
        this.loading = false;
    }, 1000);
  }

  /**
   * 
   * @param product Objecto producto
   */
  onSelectProduct(product) {
    this.Init();
    this.editando = true;
    setTimeout(() => {

      const form = <HTMLElement>document.getElementById('pedit');
      const elements = Array.from(form.children);

      const id = (<HTMLInputElement>elements[0].children[2]);
      const name = (<HTMLInputElement>elements[1].children[2]);
      const price = (<HTMLInputElement>elements[2].children[2]);
      const img = (<HTMLImageElement>elements[3].children[2]);

      id.value = product.id;
      name.value = product.name;
      price.value = product.price;
      img.src = product.img;
    }, 500);

  }

  onSelectNew(news) {
    this.Init();
    this.editando = true;
    setTimeout(() => {

      const form = <HTMLElement>document.getElementById('nedit');
      const elements = Array.from(form.children);

      const id = (<HTMLInputElement>elements[0].children[2]);
      const title = (<HTMLInputElement>elements[1].children[2]);
      const body = (<HTMLInputElement>elements[2].children[2]);
      const img = (<HTMLImageElement>elements[3].children[2]);

      id.value = news.id;
      title.value = news.title;
      body.value = news.body;
      img.src = news.img;
    }, 500);

  }


  onBrand(Form: NgForm) {
    const name = Form.value.name;
    this.API.addBrand({ name: name });
  }

  onColor(Form: NgForm) {
    const name = Form.value.name;
    this.API.addColor({ name: name });
  }

  onType(Form: NgForm) {
    const name = Form.value.name;
    this.API.addType({ name: name });
  }

  onTopic(Form: NgForm){
    const name = Form.value.name;
    this.API.addTopic({ name: name });
  }


  deleteContact(id: string) {
    if (confirm('¿Estas seguro de esta acción?')) {
      this.loading = true;
      this.API.deleteContact(id)
        .then(val => {
          this.loading = false;
        })
        .catch(err => {
          console.error(err);

        });
    }
  }

  controlPanel() {
    const menu = document.getElementById('nav');
    const btns = Array.from(menu.children);

    const produc = document.getElementById('producto');
    const news = document.getElementById('noticias');
    const contact = document.getElementById('contacto');

    btns[0].addEventListener('click', () => {
      produc.style.display = "block";
      news.style.display = "none";
      contact.style.display = "none";

    });
    btns[1].addEventListener('click', () => {
      produc.style.display = "none";
      news.style.display = "block";
      contact.style.display = "none";
    });
    btns[2].addEventListener('click', () => {
      produc.style.display = "none";
      news.style.display = "none";
      contact.style.display = "block";
    });

  }

}
