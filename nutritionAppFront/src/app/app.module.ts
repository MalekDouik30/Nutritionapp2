import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover'; 
import {MatTabsModule} from '@angular/material/tabs';
import { NgxMatSelectSearchModule }from 'ngx-mat-select-search'; // npm install ngx-mat-select-search
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxMatDatetimePickerModule, 
  NgxMatTimepickerModule } from '@angular-material-components/datetime-picker'; // Date time Picker
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker'; // datePicker
import {MatNativeDateModule} from '@angular/material/core'; //  datePicker
/* Select option search*/ 
import { NgSelectModule } from '@ng-select/ng-select'; // npm i @ng-select/ng-select@7.1.1

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GMaladeComponent } from './g-malade/g-malade.component';
import { GUtilisateurComponent } from './g-utilisateur/g-utilisateur.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AjouterUtilisateurComponent } from './g-utilisateur/ajouter-utilisateur/ajouter-utilisateur.component';
import { ModifierUtilisateurComponent } from './g-utilisateur/modifier-utilisateur/modifier-utilisateur.component';
import { SupprimerUtilisateurComponent } from './g-utilisateur/supprimer-utilisateur/supprimer-utilisateur.component';
import { ModifierMoncompteComponent } from './g-utilisateur/modifier-moncompte/modifier-moncompte.component';
import { GRoleComponent } from './g-role/g-role.component';
import { AjouterRoleComponent } from './g-role/ajouter-role/ajouter-role.component';
import { ModifierRoleComponent } from './g-role/modifier-role/modifier-role.component';
import { GParametersComponent } from './g-parameters/g-parameters.component';
import { ModifierParameterComponent } from './g-parameters/modifier-parameter/modifier-parameter.component';
import { AjouterMaladeComponent } from './g-malade/ajouter-malade/ajouter-malade.component';
import { ModifierMaladeComponent } from './g-malade/modifier-malade/modifier-malade.component';
import { GDossierMaladeComponent } from './g-dossier-malade/g-dossier-malade.component';
import { RemarqueComponent } from './remarque/remarque.component';
import { GDossierMalade2Component } from './g-dossier-malade2/g-dossier-malade2.component';
import {RendezvousComponent  } from './rendezvous/rendezvous.component';
import { AddRendezvousComponent } from './g-rendezvous/add-rendezvous/add-rendezvous.component';
import { AddrendezvousComponent } from './rendezvous/addrendezvous/addrendezvous.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    GMaladeComponent,
    GUtilisateurComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AjouterUtilisateurComponent,
    ModifierUtilisateurComponent,
    SupprimerUtilisateurComponent,
    ModifierMoncompteComponent,
    GRoleComponent,
    AjouterRoleComponent,
    ModifierRoleComponent,
    GParametersComponent,
    ModifierParameterComponent,
    AjouterMaladeComponent,
    ModifierMaladeComponent,
    GDossierMaladeComponent,
    RemarqueComponent,
    GDossierMalade2Component,   
    RendezvousComponent, AddRendezvousComponent, AddrendezvousComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    MatTabsModule,
    NgxMatSelectSearchModule,
    RouterModule,
    NgxPaginationModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatAutocompleteModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType : 'danger'
  }),
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        disallowedRoutes:[]
      }
    }),
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe,GUtilisateurComponent,NgxMatSelectSearchModule],
  bootstrap: [AppComponent],


})
export class AppModule { }
