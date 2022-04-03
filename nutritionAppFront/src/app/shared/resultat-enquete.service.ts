import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import data from '../config/appSettings.json';
import { ResultatEnquete } from './resultat-enquete';

@Injectable({
  providedIn: 'root'
})
export class ResultatEnqueteService {

  constructor(public http:HttpClient) { }
  readonly baseURL = data.back_webservices.resultatEnqueteAliementaire_url;

  listResultatEnquete : ResultatEnquete[] | undefined;

  fromData:ResultatEnquete = new ResultatEnquete();

  getResultatEnqueteAlim(){
    this.http.get(this.baseURL).subscribe(
      res => this.listResultatEnquete = res as ResultatEnquete[])
  }

  addResultatEnqueteAlim(){
    return this.http.post(this.baseURL, this.fromData);
  }
  
  deleteResultatEnqueteAlim(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getResultatEnqueteAlimById(id:number){
    return this.http.get(`${this.baseURL}/PatientId/${id}`);   
  }

}
