import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/authentification.service';
import { ParametreService } from '../shared/parametre.service';
import { UtilisateurService } from '../shared/utilisateur.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthentificationService, public router: Router,public utiService:UtilisateurService,public paramService : ParametreService,public toaster:ToastrService) {  }

  invalidLogin: boolean;
  etatutilisateur :boolean;

  utilisateurId=0;
  number_times_authenticated=0;
  number_times_to_authenticate:number
  defaultPassword:string;
  // For reset password div
  //changeView="ResetPasswordView"
  changeView="loginView"
  confirmPasswordVar:string;
  identifiedUserLogin:string;

  loginFunction(monForm:NgForm) {
    // get Get the global parameters : number of authentication attempts + the default password
    for(let item of this.paramService.listparametres){
      this.number_times_to_authenticate = item.parNombreTentatives
      this.defaultPassword=item.parMotPasseParDefaut
    }    
    this.authService.postlogin().subscribe(
      (res) => {
        const token = (<any>res).token;

      // Get User information :
      let decodeToken = JSON.parse(window.atob(token.split('.')[1])); 
      let decodedName;
      let decodedLogin;
      let decodedMail;
      let decodedRole;
      let decodedId;
      let decodeEtat;
      decodedName = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      decodedLogin = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
      decodedMail = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      decodedRole = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      decodedId = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      decodeEtat = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authorizationdecision'];   
      this.utilisateurId=Number(decodedId);      
      // if this account is not bloked
      if (decodeEtat=="True"){
        this.etatutilisateur=false;
        this.invalidLogin = false;
        if(monForm.value.password === this.defaultPassword){
          // if the password given by the user during authentication is the default password in the global parameters table
          this.identifiedUserLogin=monForm.value.login
          this.changeView="ResetPasswordView"
           // store a variable in a localstorage to test on it in page redirection in authentification.service  canActivate()
        }
        else{
          localStorage.setItem('jwt', token);
          this.router.navigate(['/']);
        } 
      }
      // if this account is bloked
      if (decodeEtat=="False"){
        this.etatutilisateur=true
      } 
      },
      (err) => {
        this.invalidLogin = true;
        
        this.number_times_authenticated+=1
        //if the erroneous authentication attempts are greater than 3 => block the account
        if (this.number_times_authenticated > this.number_times_to_authenticate){
          this.authService.BlockUtilisateurBylogin(this.authService.login)
          this.invalidLogin=false // To remove the message "Invalide Username ou mot de passe"
          this.etatutilisateur=true // And Display the message "this account is blocked"
        }
        console.log(err);
      }
    );
  }

  changeUserPassword(resetPswdForm:NgForm){
    this.utiService.changePassword(this.identifiedUserLogin,this.utiService.fromData.utiMotPasse).subscribe(
      res=>{
        this.toaster.success("Votre mot de passe a été modifié avec succès vous pouvez vous connecter avec ce nouveau mot de passe","Modification")
        this.router.navigate(['login']);
        this.changeView="loginView"
      },
      err => {
        this.toaster.error("Échec de la modification du mot de passe, réessayez","Modification")
        console.log(err);}
    );
  }

  ngOnInit(): void {
    // To get general Parametre of application
    this.paramService.getParametres()
  }
}
