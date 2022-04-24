import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(public http:HttpClient) { }

  readonly baseURL = environment.utilisateur_url;
  listUtilisateur : Utilisateur[] | undefined;
  fromData:Utilisateur = new Utilisateur();
  dataBetweenComponent :string;
  
  getUtilisateur(){
    this.http.get(this.baseURL).subscribe(
      res => this.listUtilisateur = res as Utilisateur[])
  }  
  putUtilisateur(){
    console.log(this.fromData.utiId)
    console.log(this.fromData)

    return this.http.put(`${this.baseURL}/${this.fromData.utiId}`, this.fromData);
  }
  deleteUtilisateur(id:number){
    return this.http.put(`${this.baseURL}/delete/${id}`, this.fromData);
  }
  addUtilisateur(){
    return this.http.post(this.baseURL, this.fromData);
  }
  getUserLoginInformation(){
    // In this function we decode the user's information from the "jwt" token in the local storage
    let decodedName;
    let decodedLogin;
    let decodedMail;
    let decodedRole;
    let decodedId;
    let decodeEtat;
    let token = localStorage.getItem("jwt")

    if(token!=null){
      let decodeToken = JSON.parse(window.atob(token.split('.')[1])); 
      decodedName = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      decodedLogin = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
      decodedMail = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      decodedRole = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      decodedId = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      decodeEtat = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authorizationdecision'];    
    }

      return {
        decodedName,decodedLogin,decodedMail,decodedRole,decodedId,decodeEtat
      }
  }
  changePassword(login:string,newPassword:string){
    return this.http.put(`${this.baseURL}/resetPassword/${login}/${newPassword}`, this.fromData);
  }

  initializeUser(id:number){
    return this.http.put(`${this.baseURL}/initialize/${id}`,this.fromData);
  }


}
