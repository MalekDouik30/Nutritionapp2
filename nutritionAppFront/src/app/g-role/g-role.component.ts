import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../shared/role';
import { RoleService } from '../shared/role.service';
import {AjouterRoleComponent } from './ajouter-role/ajouter-role.component';
import { ModifierRoleComponent } from './modifier-role/modifier-role.component';

@Component({
  selector: 'app-g-role',
  templateUrl: './g-role.component.html',
  styleUrls: ['./g-role.component.scss']
})
export class GRoleComponent implements OnInit {

  constructor(public rolService:RoleService,public toaster:ToastrService,public dialog:MatDialog) { }
  searchWord=""
  
  onAjouterRole(){
    this.dialog.open(AjouterRoleComponent)
  }

  onModifierRole(SelectedRecord:Role){
    this.rolService.fromData= Object.assign({},SelectedRecord);
    this.dialog.open(ModifierRoleComponent)
  }

  onSupprimerRole(id:number){
    this.rolService.deleteRole(id).subscribe(
      res=>{
        this.rolService.getRole();
        this.toaster.success("Role supprimé avec succès","Suppression")
      },
      err => {
        this.toaster.error("Échec de supprimer role : Il y a des utilisteurs actif avec ce role","Suppression")
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.rolService.getRole()

  }

}
