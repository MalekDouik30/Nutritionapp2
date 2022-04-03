import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GUtilisateurComponent } from './g-utilisateur/g-utilisateur.component';
import { AuthentificationService } from './shared/authentification.service';
import { ModifierMoncompteComponent } from './g-utilisateur/modifier-moncompte/modifier-moncompte.component';
import { GRoleComponent } from './g-role/g-role.component';
import { GParametersComponent } from './g-parameters/g-parameters.component';
import { GMaladeComponent } from './g-malade/g-malade.component';
import {GDossierMalade2Component  } from './g-dossier-malade2/g-dossier-malade2.component';
import {GDossierMaladeComponent  } from './g-dossier-malade/g-dossier-malade.component';
import {RendezvousComponent  } from './rendezvous/rendezvous.component';

import data from './config/appSettings.json';
import {RoleGuardGuard} from './shared/role-guard.guard';


const routes: Routes = [
  { path:'',component:GMaladeComponent,canActivate:[AuthentificationService]},
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'user',component:GUtilisateurComponent, canActivate:[RoleGuardGuard], data: { role: [data.userRoleIndb.admin_id]} },
  { path:'profil', component:ModifierMoncompteComponent,canActivate:[AuthentificationService]},
  { path:'role', component:GRoleComponent,canActivate:[AuthentificationService]},
  { path:'gparametre', component:GParametersComponent,canActivate:[AuthentificationService], data: { role: [data.userRoleIndb.admin_id , data.userRoleIndb.utilisateur_id ]}},
  { path:'malade', component:GMaladeComponent,canActivate:[AuthentificationService], data: { role: [data.userRoleIndb.admin_id , data.userRoleIndb.utilisateur_id ]}},
  { path:'dossier-malade2', component:GDossierMalade2Component,canActivate:[AuthentificationService], data: { role: [data.userRoleIndb.admin_id , data.userRoleIndb.utilisateur_id ]}},
  { path:'dossier-malade', component:GDossierMaladeComponent,canActivate:[AuthentificationService], data: { role: [data.userRoleIndb.admin_id , data.userRoleIndb.utilisateur_id ]}},
  { path:'rendez-vous', component:RendezvousComponent,canActivate:[AuthentificationService], data: { role: [data.userRoleIndb.admin_id , data.userRoleIndb.utilisateur_id ]}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
