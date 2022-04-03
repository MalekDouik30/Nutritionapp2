import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/shared/patient';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-modifier-malade',
  templateUrl: './modifier-malade.component.html',
  styleUrls: ['./modifier-malade.component.scss']
})
export class ModifierMaladeComponent implements OnInit {

  constructor(public patService:PatientService, public toaster:ToastrService, private dialog:MatDialog) { }
  etatPatient:any
  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.patService.fromData = new Patient();
  }

  updateData(monForm:NgForm){
    this.patService.putPatient().subscribe(
      res=>{
        this.resetForm(monForm);
        
        this.patService.getPatient();
        this.toaster.info("Patient modifié avec succès","Modification")
      },

      err => {
        this.toaster.error("Échec de modifier compte utilisateur","Modification")
        console.log(err);}
    );
  }

  onSubmit(monForm : NgForm){
    if(this.etatPatient == "true"){
      this.patService.fromData.patEtat = true
    }
    if(this.etatPatient == "false"){
      this.patService.fromData.patEtat = false
    }
    this.updateData(monForm)
    this.closeDialog(monForm)
    monForm.reset();
}
  closeDialog(monForm:NgForm){ 
    this.dialog.closeAll();
    this.resetForm(monForm)
  }

  ngOnInit(): void {
    this.patService.getPatient(); 
   
  }

}
