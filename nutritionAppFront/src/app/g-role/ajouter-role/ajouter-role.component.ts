import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/shared/role';
import { RoleService } from 'src/app/shared/role.service';

@Component({
  selector: 'app-ajouter-role',
  templateUrl: './ajouter-role.component.html',
  styleUrls: ['./ajouter-role.component.scss']
})
export class AjouterRoleComponent implements OnInit {

  constructor(public rolService:RoleService, public toaster:ToastrService,private dialog:MatDialog) { }


  closeDialog(monForm:NgForm){
    this.dialog.closeAll();
    this. resetForm(monForm)
  }

  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.rolService.fromData = new Role();
  }

  insertData(monForm:NgForm){
    this.rolService.addRole().subscribe(
      res=>{
        this.resetForm(monForm);
        this.rolService.getRole();
        this.toaster.success("Ajouté avec succes","Role ajouté")
      },

      err => {
        this.toaster.error("Echec d'ajout","Erreur")
        console.log(err);}
    );
  }
  
  onSubmit(monform:NgForm){
      if (this.rolService.fromData.rolId ==0){
        this.insertData(monform)
        this.closeDialog(monform)
        monform.reset();
      }
  }


  ngOnInit(): void {
  }

}
