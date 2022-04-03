import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { Utilisateur } from '../../shared/utilisateur';
import { RoleService } from '../../shared/role.service';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent implements OnInit {

  constructor(public utiService:UtilisateurService,public rolService:RoleService,public toaster:ToastrService,private dialog:MatDialog) { }
  etatUser : any 
 
  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.utiService.fromData = new Utilisateur();
  }

  updateData(monForm:NgForm){
    this.utiService.putUtilisateur().subscribe(
      res=>{
        this.resetForm(monForm);
        
        this.utiService.getUtilisateur();
        this.toaster.info("Compte utilisateur modifié avec succès","Modification")
      },

      err => {
        this.toaster.error("Échec de modifier compte utilisateur","Modification")
        console.log(err);}
    );
  }

  onSubmit(monForm : NgForm){
    if(this.etatUser == "true"){
      this.utiService.fromData.utiEtat = true
    }
    if(this.etatUser == "false"){
      this.utiService.fromData.utiEtat = false
    }
    this.updateData(monForm)
    this.closeDialog()
    monForm.reset();
}
  closeDialog(){ this.dialog.closeAll(); }

  ngOnInit(): void {
    this.utiService.getUtilisateur(); 
    this.rolService.getRole(); 
  }

  
}
