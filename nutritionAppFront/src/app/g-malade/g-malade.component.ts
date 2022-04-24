import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../shared/patient';
import { PatientService } from '../shared/patient.service';
import { AjouterMaladeComponent } from './ajouter-malade/ajouter-malade.component';
import { ModifierMaladeComponent } from './modifier-malade/modifier-malade.component';
import { RemarqueComponent } from 'src/app/remarque/remarque.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-g-malade',
  templateUrl: './g-malade.component.html',
  styleUrls: ['./g-malade.component.scss']
})
export class GMaladeComponent implements OnInit {

  constructor(public router:Router,public patService:PatientService,public dialog:MatDialog,public toaster:ToastrService) { }
  searchWord=""

  onAjouterPatient(){
    this.dialog.open(AjouterMaladeComponent, {
      height: '700px'
    });   
  }

  onModifierPatient(SelectedRecord:Patient){
    this.patService.fromData=  Object.assign({},SelectedRecord);
    this.dialog.open(ModifierMaladeComponent, {
      height: '700px'
    });   
  }

  onSupprimerPatient(id:number){
    this.patService.deletePatient(id).subscribe(
      res=>{
        this.patService.getPatient();
        this.toaster.success("Patient supprimé avec succès","Suppression")
      },
      err => {
        this.toaster.error("Échec de supprimer patient","Suppression")
        console.log(err);
        }
      );
  }

  onDossierPatient(SelectedRecord:Patient){
    this.patService.idPatient=SelectedRecord.patId
    console.log("Id Patient sélectioné : "+ SelectedRecord.patId)
    this.router.navigate(['dossier-malade2']);
    
   /* 
    this.dialog.open(GDossierMaladeComponent , {
      width: '900px',
      height: '600px'
    })
    */

  }

  onRemarque(SelectedRecord:Patient){
    this.patService.idPatient=SelectedRecord.patId
    this.dialog.open(RemarqueComponent,{ maxWidth: '800px'}) 
  }

  ngOnInit(): void {
    this.patService.getPatient()
    

    if(localStorage.getItem('refrechComponent')=='1'){
      window.location.reload()
      localStorage.setItem('refrechComponent', "2")
    }

  }

}
