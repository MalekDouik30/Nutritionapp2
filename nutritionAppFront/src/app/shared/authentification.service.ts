import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilisateurService } from './utilisateur.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService implements CanActivate {

  constructor(private http:HttpClient, private jwtHelper :JwtHelperService, private serviceUser:UtilisateurService,private router:Router) { }
  
  login:string
  password:string
  readonly baseURL =environment.utilisateur_url;

  postlogin(){

    const body={
      "utiLogin" : this.login,
      "utiMotPasse" : this.password,
    }
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');

    if(regex.test(this.login)){
      // If the condition with the email is true so send to the rquest an email
      const body={
        "utiEmail" : this.login,
        "utiMotPasse" : this.password,
      }
      return this.http.post(this.baseURL+"/login", body)
    }

    return this.http.post(this.baseURL+"/login", body)      
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    let redirectionPath: string = "";
    const token = localStorage.getItem("jwt");   
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;   
    }
    redirectionPath="login";
    this.router.navigate([redirectionPath]);
    return false;
  }
  // During authentication block user By Login after many login attemps 
  BlockUtilisateurBylogin(login:string){
    return this.http.put(`${this.baseURL}/deleteByLogin/${login}`,null).subscribe(
        (res) => {
          console.log("Bloqué avec succes")
        },
        (err) => {
          console.log(err);
        }
      )
    }
    
}
