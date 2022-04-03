import { DatePipe } from '@angular/common';
import { Component, OnInit,Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/shared/role.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { Utilisateur } from '../../shared/utilisateur';
@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.scss']
})
export class AjouterUtilisateurComponent implements OnInit {

  constructor(public utiService:UtilisateurService,public rolService:RoleService,public toaster:ToastrService,private dialog:MatDialog,public datePipe: DatePipe) { }
  confirmPasswordVar="";
  todayDate = this.datePipe.transform(new Date(),"dd-MM-yyyy")
  etatUser : any


  ajouterUtilisateur(monForm:NgForm){
    let date = new Date()
    this.utiService.fromData.utiDateCreation = this.datePipe.transform(date,"yyyy-MM-dd")||'{}';
    if (this.utiService.fromData.utiRole==0){ 
    // ghacha
      this.utiService.fromData.utiRole=2
    }
    this.utiService.addUtilisateur().subscribe(
      res=>{
        this.resetForm(monForm);
        this.utiService.getUtilisateur();
        this.toaster.success("Compte utilisateur ajouté avec succès","Ajout")
      },
      err => {
        this.toaster.error("Échec d'ajouter compte utilisateur : "+ err.error.message,"Ajout")
        console.log(err);
      }
    );
  }

  closeDialog(){ this.dialog.closeAll(); }
  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.utiService.fromData = new Utilisateur();
  }
  onSubmit(monForm : NgForm){
    this.ajouterUtilisateur(monForm)
    this.closeDialog()
    monForm.reset();    
}

  ngOnInit() {
    this.rolService.getRole()
    this.utiService.getUtilisateur();
    //console.log("SSSSSSSSSSSSSSSSSSS")
    //console.log(this.utiService.getDataBetweenComponent())
  
  }


}
