import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/shared/role';
import { RoleService } from 'src/app/shared/role.service';

@Component({
  selector: 'app-modifier-role',
  templateUrl: './modifier-role.component.html',
  styleUrls: ['./modifier-role.component.scss']
})
export class ModifierRoleComponent implements OnInit {

  constructor(public rolService:RoleService, public toaster:ToastrService,private dialog:MatDialog) { }


  closeDialog(monForm:NgForm){
    this.dialog.closeAll()
    this.resetForm(monForm)
  }
  
  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.rolService.fromData = new Role();
  }

  updateData(monForm:NgForm){
    this.rolService.putRole().subscribe(
      res=>{
        this.resetForm(monForm);
        
        this.rolService.getRole();
        this.toaster.info("Modifié avec succes")
      },

      err => {
        this.toaster.error("Erreur de Modification","Error")
        console.log(err);}
    );
  }

  onSubmit(monForm : NgForm){
      this.updateData(monForm)
      this.closeDialog(monForm)
      monForm.reset();
    
  }

  ngOnInit(): void {
  }

}
