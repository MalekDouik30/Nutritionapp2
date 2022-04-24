import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Remarque } from './remarque';

@Injectable({
  providedIn: 'root'
})
export class RemarqueService {

  constructor(private http:HttpClient) { }
  readonly baseURL = environment.remarque_url;

  listRemarqueByPatient : Remarque[] ;
  fromData:Remarque = new Remarque();

  getRemarque(idPatient:number){
    this.http.get(`${this.baseURL}/${idPatient}`).toPromise().then(
      res => { this.listRemarqueByPatient = res as Remarque[] });   
  }
  deleteRemarque(idRemarque:Number){
    return this.http.delete(`${this.baseURL}/${idRemarque}`);
  } 
  addRemarque(){
    return this.http.post(this.baseURL, this.fromData);
  }

}
