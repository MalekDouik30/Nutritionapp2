import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/shared/patient';
import { PatientService } from 'src/app/shared/patient.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';


@Component({
  selector: 'app-ajouter-malade',
  templateUrl: './ajouter-malade.component.html',
  styleUrls: ['./ajouter-malade.component.scss']
})
export class AjouterMaladeComponent implements OnInit {

  constructor(public patService:PatientService,public utiService:UtilisateurService, public toaster:ToastrService, public dialog:MatDialog) { }

  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.patService.fromData = new Patient();
  }

  ajouterMalade(monForm:NgForm){

    this.patService.fromData.patNutritionnisteId = this.utiService.getUserLoginInformation().decodedId
    this.patService.fromData.patImc = this.patService.fromData.patPoids / (this.patService.fromData.patTaille * this.patService.fromData.patTaille) // IMC = poids /taille²
    this.patService.addPatient().subscribe(
      res=>{
        this.resetForm(monForm);
        this.patService.getPatient();
        this.toaster.success("Patient ajouté avec succès","Ajout")
      },
      err => {
        this.toaster.error("Échec d'ajouter patient : "+ err.error.message,"Ajout")
        console.log(err);
      }
    );
  }

  closeDialog(){ this.dialog.closeAll(); }

  onSubmit(monForm : NgForm){
    this.ajouterMalade(monForm)
    this.closeDialog()
    monForm.reset();    
}

  
  ngOnInit(): void {
  }

}
