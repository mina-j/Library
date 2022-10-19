import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { ChangeComponent } from './change/change.component';
import { CitalacComponent } from './citalac/citalac.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { HomeComponent } from './home/home.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'citalac', component: CitalacComponent},
  {path: 'login/change', component: ChangeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'search', component: SearchComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'zaduzenja', component: ZaduzenjaComponent},
  {path: 'istorija', component: IstorijaComponent},
  {path: 'bookdetails', component: BookdetailsComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'dodaj', component: DodajComponent},
  {path: 'korisnici', component: KorisniciComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
