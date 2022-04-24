import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Patient } from './patient';
import { UtilisateurService } from './utilisateur.service';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http:HttpClient,public utiService:UtilisateurService) { }
  readonly baseURL = environment.malade_url;

  listPatient : Patient[];
  fromData:Patient = new Patient();
  idPatient:number;
  PatientById:Patient = new Patient();

  getPatient(){
    let idMedecin=Number(this.utiService.getUserLoginInformation().decodedId)
    this.http.get(`${this.baseURL}/GetPatientByIdMedecin/${idMedecin}`).subscribe(
      res => {this.listPatient = res as Patient[]
    }
    )}


    
  putPatient(){return this.http.put(`${this.baseURL}/${this.fromData.patId}`, this.fromData);}
  deletePatient(id:number){return this.http.put(`${this.baseURL}/delete/${id}`, this.fromData);}
  addPatient(){return this.http.post(this.baseURL, this.fromData);}
 
  getPatientById(id:Number){
    this.http.get(`${this.baseURL}/${id}`).subscribe(
      res => {this.PatientById = res as Patient
    })
    }


    getPatientByIdResolver(id:Number):Observable<Patient>{
      return this.http.get<Patient>(`${this.baseURL}/${id}`)
    }
}
