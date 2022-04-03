import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../shared/patient.service';
import { Remarque } from '../shared/remarque';
import { RemarqueService } from '../shared/remarque.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-remarque',
  templateUrl: './remarque.component.html',
  styleUrls: ['./remarque.component.scss']
})
export class RemarqueComponent implements OnInit {

  constructor(public patService:PatientService,public remService:RemarqueService,public toaster:ToastrService,public datepipe: DatePipe) { }
  importance:string
  searchWord=""
  p :number = 1; // paginator

  ajouterRemarque(monForm:NgForm){
    let date=new Date();
    let dateNow =this.datepipe.transform(date, 'yyyy-MM-dd');
    this.remService.fromData.remDateAjout= dateNow
    if (this.importance ==null || typeof this.importance === 'undefined'){
      this.remService.fromData.remImportanceNiveau=1
    }
    else{
      this.remService.fromData.remImportanceNiveau= Number(this.importance)
    }
    
    this.remService.fromData.remIdPateint = this.patService.idPatient
    this.remService.addRemarque().subscribe(
      res=>{
        this.resetForm(monForm);
        this.patService.getPatient();
        this.toaster.success("Remarque ajoutée pour ce patient","Ajout")
        this.remService.getRemarque(this.patService.idPatient)
      },
      err => {
        this.toaster.error("Échec d'ajouter la remarque : "+ err.error.message,"Ajout")
        console.log(err);
      }
    );
  }

  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.remService.fromData = new Remarque();
  }
  onSubmit(monForm:NgForm){
    this.ajouterRemarque(monForm)
    monForm.reset();    
  }

  supprimerRemarque(idRemarque:Number){
    this.remService.deleteRemarque(idRemarque).subscribe(
      res=>{
        this.toaster.success("Remarque supprimé pour ce patient","Suppression")
        this.remService.getRemarque(this.patService.idPatient)
      },
      err => {
        this.toaster.error("Échec de supprimer remarque : "+ err.error.message,"Suppression")
      }
    )
  }
  ngOnInit(): void {
    this.remService.getRemarque(this.patService.idPatient)
  }

  
}
