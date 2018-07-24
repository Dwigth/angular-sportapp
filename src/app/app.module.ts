import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
//rutas
import { APP_ROUTING } from './app.routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';



//components
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { AsideComponent } from './components/aside/aside.component';
import { ProductsComponent } from './components/products/products.component';
import { NewsComponent } from './components/news/news.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { StorageComponent } from './components/shared/storage/storage.component';

//modules


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    AdminComponent,
    AsideComponent,
    ProductsComponent,
    NewsComponent,
    FooterComponent,
    LoginComponent,
    LoadingComponent,
    StorageComponent
  ], 
  imports: [
    BrowserModule,
    FormsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
