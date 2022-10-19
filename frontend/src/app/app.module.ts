import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CitalacComponent } from './citalac/citalac.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ChangeComponent } from './change/change.component';
import { AdminComponent } from './admin/admin.component';
import { SearchComponent } from './search/search.component';
import { ProfilComponent } from './profil/profil.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { KorisniciComponent } from './korisnici/korisnici.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CitalacComponent,
    HomeComponent,
    ChangeComponent,
    AdminComponent,
    SearchComponent,
    ProfilComponent,
    ZaduzenjaComponent,
    IstorijaComponent,
    BookdetailsComponent,
    ModeratorComponent,
    DodajComponent,
    KorisniciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
