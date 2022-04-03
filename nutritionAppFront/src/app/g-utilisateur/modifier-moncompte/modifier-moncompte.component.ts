import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utilisateur } from 'src/app/shared/utilisateur';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modifier-moncompte',
  templateUrl: './modifier-moncompte.component.html',
  styleUrls: ['./modifier-moncompte.component.scss']
})
export class ModifierMoncompteComponent implements OnInit {

  constructor(public utiService:UtilisateurService,public toaster:ToastrService) { }
  changeView="View1"
  decodedName:string;
  decodedLogin:string;
  decodedMail:string;
  decodedRole:string;
  utiDateCreation:string;
  
  majMonProfile(){
    
    this.changeView="View2"
  }

  majMonMotPasse(){
    this.changeView="View3"
  }

  annulerMaj(){
    this.changeView="View1"
  }

  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.utiService.fromData = new Utilisateur();
  }

  onSubmit(monForm:NgForm){
    // Mise a jour Profile sans mot de passe
    this.utiService.putUtilisateur().subscribe(
      res=>{
        this.resetForm(monForm);
        
        this.utiService.getUtilisateur();
        this.toaster.info("Compte utilisateur modifié avec succès","Modification")
        this.changeView="View1"
      },

      err => {
        this.toaster.error("Échec de modifier compte utilisateur","Modification")
        console.log(err);}
    );

  }

  onSubmit2(monForm:NgForm){
    // Mise a jour  mot de passe
  }

  ngOnInit(): void {

    this.decodedName=this.utiService.getUserLoginInformation().decodedName
    this.decodedLogin=this.utiService.getUserLoginInformation().decodedLogin
    this.decodedMail=this.utiService.getUserLoginInformation().decodedMail
    this.decodedRole=this.utiService.getUserLoginInformation().decodedRole   
  }

}
