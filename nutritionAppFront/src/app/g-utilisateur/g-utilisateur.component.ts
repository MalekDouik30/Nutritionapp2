import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../shared/utilisateur.service';
import { Utilisateur } from '../shared/utilisateur';
import {MatDialog} from '@angular/material/dialog';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../shared/role.service';
import { Role } from '../shared/role';

@Component({
  selector: 'app-g-utilisateur',
  templateUrl: './g-utilisateur.component.html',
  styleUrls: ['./g-utilisateur.component.scss']
})
export class GUtilisateurComponent implements OnInit {
  searchWord=""
  constructor(public utiService:UtilisateurService,public rolService:RoleService,public dialog:MatDialog,public toaster:ToastrService) { }

  testVar:string 
  role:Role
  
  onAjouterUtilisateur(){
    // Ajouter utilisateur Popup
    this.dialog.open(AjouterUtilisateurComponent);   
  }

  onModifierUtilisateur(SelectedRecord:Utilisateur){
    // Modifier Utilisateur Popup
    this.utiService.fromData=  Object.assign({},SelectedRecord);
    this.dialog.open(ModifierUtilisateurComponent);   
  }

  onSupprimerUtilisateur(id:number){
    this.utiService.deleteUtilisateur(id).subscribe(
      res=>{
        this.utiService.getUtilisateur();
        this.toaster.success("Compte utilisateur supprimé avec succès","Suppression")
      },
      err => {
        this.toaster.error("Échec de supprimer compte utilisateur","Suppression")
        console.log(err);
      }
    );
    }
    onInitialize (id:number){
      this.utiService.initializeUser(id).subscribe(
        res=>{
          this.utiService.getUtilisateur();
          // notification
          this.toaster.success("Compte utilisateur initialisé avec succès","Initialisation")
        },
        err => {
          // notification
          this.toaster.error("Échec d'initialisé compte utilisateur","Initialisation")
          console.log(err);
        }
      );
    }

    getRoleName(id:number){
      this.rolService.getRoleById(id).subscribe(
        res=>{
          this.role=res as Role;
        }
      )
      return this.role.rolLibelle
    }

  ngOnInit(): void {
    // Afficher utilisateurs
    this.utiService.getUtilisateur()

  }

}
