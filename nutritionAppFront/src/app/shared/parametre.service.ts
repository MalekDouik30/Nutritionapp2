import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parametre } from './parametre';
import data from '../config/appSettings.json';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {
  
  constructor(private http:HttpClient) { }

  readonly baseURL = data.back_webservices.parametre_url;

   listparametres : Parametre[] ;
   fromData:Parametre = new Parametre();
   
  getParametres(){
    this.http.get(this.baseURL).toPromise().then(
      res => { this.listparametres = res as Parametre[] });   
  }

  deleteParametre(idParam:number){
    this.http.delete(`${this.baseURL}/${idParam}`);
  } 
  addParametre(){
    this.http.post(this.baseURL, this.fromData);
  }
  putParametre(){
    return this.http.put(`${this.baseURL}/${this.fromData.parId}`, this.fromData);
  }
}
