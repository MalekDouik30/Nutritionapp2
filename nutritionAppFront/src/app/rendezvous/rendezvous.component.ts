import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../shared/patient.service';
import { RendezvousService } from '../shared/rendezvous.service';
import { UtilisateurService } from '../shared/utilisateur.service';
import { AddrendezvousComponent } from './addrendezvous/addrendezvous.component';
import { Rendezvous  } from '../shared/rendezvous';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core'; // Material Date Picker

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.scss']
})
export class RendezvousComponent implements OnInit {
  searchWord=""
  myDate:any
  testFilter=false

  // Material Date piker
  rangeDateCreation = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  constructor(private datePipe: DatePipe,public patService:PatientService,public userService:UtilisateurService,public rdzService:RendezvousService,
    public http:HttpClient,public dialog:MatDialog,public toaster:ToastrService,
    private dateAdapter: DateAdapter<Date>) {

      this.myDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")+"T00:00"
      this.dateAdapter.setLocale('fr');
     }
    

  onAjouterRendez_vous(){
    this.dialog.open(AddrendezvousComponent,{
      height: '70%',
      width: '50%'
  })
}

onModifierRendezvous(SelectedRecord:Rendezvous){
  // Modifier Rendezvous Popup
  this.rdzService.fromData=  Object.assign({},SelectedRecord);
  this.dialog.open(AddrendezvousComponent);   
}

onSupprimerRendezvous(id:number){
  this.rdzService.deleteRdz(id).subscribe(
    res=>{
      this.rdzService.getRdz(this.userService.getUserLoginInformation().decodedId)      
      this.toaster.success("Rendez-vous supprimé avec succès","Suppression")
    },
    err => {
      this.toaster.error("Échec de supprimer Rendez-vous","Suppression")
      console.log(err);
    }
  );
  }
  ngOnInit(): void {
    this.patService.getPatient();
    this.rdzService.getRdz(this.userService.getUserLoginInformation().decodedId)
    
  }

  verifDateRdz(rdzDate:any){
    //alert(" rdz date : "+ rdzDate)
    //alert("aujourd'hui : "+this.myDate)*
    if (Date.parse(this.myDate) >= Date.parse(rdzDate) ){
      return true
    }
    return false
  }

  ondisplayFilter(){
    this.testFilter=true
  }
  oncloseFilter(){
    this.testFilter=false
    this.rdzService.getRdz(this.userService.getUserLoginInformation().decodedId)
    this.rangeDateCreation.reset()
    
  }

  convertDateToString(date:any){
    if(date!=null){
      var month=Number(date.getMonth()+1)
      console.log(date.getFullYear()+"-"+ +"-"+date.getDate())
      return date.getFullYear()+"-"+String(month) +"-"+date.getDate() ; 
    }
    else{
      return null
    }
    
  }

  search(functionSearchfor : NgForm){  
    var dated = this.convertDateToString(this.rangeDateCreation.value.start)
    var datef = this.convertDateToString(this.rangeDateCreation.value.end)
    this.rdzService.getRdzSearch(dated,datef)
  }



}
