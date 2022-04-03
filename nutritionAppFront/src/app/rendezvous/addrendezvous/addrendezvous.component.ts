import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/shared/patient.service';
import { Rendezvous } from 'src/app/shared/rendezvous';
import { RendezvousService } from 'src/app/shared/rendezvous.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import {MatSelectModule} from '@angular/material/select';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addrendezvous',
  templateUrl: './addrendezvous.component.html',
  styleUrls: ['./addrendezvous.component.scss']
})
export class AddrendezvousComponent implements OnInit {

  myDate:any
  filterDateFrom:any;
  nomPatientVar:any;
  idpatient:number;
  
  constructor(private datePipe: DatePipe,public userService:UtilisateurService,public patService:PatientService,public rdzService:RendezvousService,public dialog:MatDialog,public toaster:ToastrService) { 
     this.myDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")+"T00:00"
  }  

  ajouterRdz(monform:NgForm){    
    for(let i of this.patService.listPatient){
      let nomPrenom=i.patNom + " " + i.patPrenom
      if (nomPrenom == this.nomPatientVar){
        this.idpatient=i.patId
      }
    }
    this.rdzService.fromData.rendMedecinId= this.userService.getUserLoginInformation().decodedId
    this.rdzService.fromData.rendPatientId = this.idpatient
    this.rdzService.fromData.rendDate = this.filterDateFrom
    this.rdzService.addRdz().subscribe(
      res=>{
        this.rdzService.getRdz(this.userService.getUserLoginInformation().decodedId)
        this.resetForm(monform);
        this.rdzService.addRdz();
        this.toaster.success("Rendez-vous ajouté avec succès","Ajout")
      },
      err => {
        this.toaster.error("Échec d'ajouter ce rendez-vous : "+ err.error.message,"Ajout")
        console.log(err);
      }
    );
    

  }

  closeDialog(){ this.dialog.closeAll(); }


  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.rdzService.fromData = new Rendezvous();
  }
  onSubmit(monForm : NgForm){
    this.ajouterRdz(monForm)
    this.closeDialog()
    monForm.reset();    
}

  ngOnInit() {
    let idMedecin=this.userService.getUserLoginInformation().decodedId
    this.patService.getPatient();
    this.userService.getUtilisateur();
  }



}
