import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from '../shared/utilisateur.service';
import { Utilisateur } from '../shared/utilisateur';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public datePipe: DatePipe, public service:UtilisateurService,public toaster:ToastrService,public router: Router) { }

  confirmPasswordVar="";

  register(registerForm:NgForm){
    // Initialize some variables that the user does not suppose to give them when registering 
    const date = new Date()
    this.service.fromData.utiDateCreation = this.datePipe.transform(date,"yyyy-MM-dd")||'{}';
    this.service.fromData.utiEtat=true
    this.service.fromData.utiRole=2 //  By default we assign role 2 which is a normal user to someone who uses the "register" interface to register for the platform and if we want to change the role it's up to the admin to assign it a new role 

    this.service.addUtilisateur().subscribe(
      res=>{
        this.toaster.success("Inscription réussie")
        this.resetForm(registerForm);
        this.router.navigate(['/login']); 
      },
      err => {
        this.toaster.error("Votre compte n'a pas été ajouté","Erreur d'inscription")
        console.log(err)
      },
    );
    
  }
  // Reset user model 
  resetForm(registerForm:NgForm){
    this.service.fromData = new Utilisateur();
    console.log(this.service.fromData)
  }
  
  ngOnInit(){
  }

}
