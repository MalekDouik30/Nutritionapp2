import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import data from '../config/appSettings.json';
import { DossierPatient } from './dossierPatient';

@Injectable({
  providedIn: 'root'
})
export class DossierPatientService {

  constructor(private http:HttpClient) { }

  readonly baseURL = data.back_webservices.dossierPatient_url;

   listDossierPatient : DossierPatient[] ;
   fromDataDossierPatient:DossierPatient = new DossierPatient();
   
  getDossierPatient(){
    this.http.get(this.baseURL).toPromise().then(
      res => { this.listDossierPatient = res as DossierPatient[] });   
  }

  deleteDossierPatient(idDossierPatient:number){
    return this.http.delete(`${this.baseURL}/${idDossierPatient}`);
  } 
  addDossierPatient(){
    return this.http.post(this.baseURL, this.fromDataDossierPatient);
  }
  putDossierPatient(){
    return this.http.put(`${this.baseURL}/${this.fromDataDossierPatient.dosId}`, this.fromDataDossierPatient);
  }

  getDossierPatientVerif(id:number){
    return this.http.get(`${this.baseURL}/PatientId/${id}`);   
  }
}
