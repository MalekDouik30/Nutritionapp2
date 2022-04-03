import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Parametre } from 'src/app/shared/parametre';
import { ParametreService } from 'src/app/shared/parametre.service';

@Component({
  selector: 'app-modifier-parameter',
  templateUrl: './modifier-parameter.component.html',
  styleUrls: ['./modifier-parameter.component.scss']
})
export class ModifierParameterComponent implements OnInit {

  constructor(public service:ParametreService,public dialog:MatDialog, public toaster:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(monForm:NgForm){
    this.service.putParametre().subscribe(
      res=>{
        this.resetForm(monForm);
        this.dialog.closeAll();
        this.service.getParametres();
        this.toaster.info("Paramètre modifié avec succès","Modification")
        
      },
  
      err => {
        this.toaster.error("Échec de modifier Paramètre","Modification")
        console.log(err);
      }
    );
  }

  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.service.fromData = new Parametre();
  }
  closeDialog(){
    this.dialog.closeAll();
  }

  generatePassword(){
    var randPasswordPart1 = Array(10).fill("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    var randPasswordPart2 = Array(2).fill("!@#$&*").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    var randPasswordPart3 = Array(2).fill("0123456789").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    this.service.fromData.parMotPasseParDefaut = randPasswordPart1+randPasswordPart2+randPasswordPart3
  }

}
