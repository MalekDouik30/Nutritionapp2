import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rendezvous } from './rendezvous';
import data from '../config/appSettings.json';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  listRendezvous:Rendezvous[]
  fromData:Rendezvous = new Rendezvous();
  urlParamsSearch="";

  constructor(public http:HttpClient) { }
  readonly baseURL = data.back_webservices.rendezvous_url;


  getRdz(idMedecin:number){
    this.http.get(`${this.baseURL}/GetRendezVousByMedecin/${idMedecin}`).subscribe(
      res => this.listRendezvous = res as Rendezvous[])
  }
  putRdz(){
    return this.http.put(`${this.baseURL}/${this.fromData.rendId}`, this.fromData);
  }
  addRdz(){
    console.log(this.fromData)
    return this.http.post(this.baseURL, this.fromData);
  }
  deleteRdz(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }


  getRdzSearch(dated:string|null,datef:string|null){
    this.urlParamsSearch="";
    if(dated!="" && dated!=null ){
      this.urlParamsSearch=this.urlParamsSearch+"dated="+dated
    }
    if(datef!="" && datef!=null ){
      this.urlParamsSearch=this.urlParamsSearch+"&datef="+datef
    }

    //https://localhost:44343/api/Rendezvous/searchs?dated=2022-21-11&datef=2022-28-11
    //https://localhost:44343/api/Rendezvous/searchs?dated=2022-02-16&datef=2022-02-28
    console.log(`${this.baseURL}/searchs?${this.urlParamsSearch}`);
    this.http.get(`${this.baseURL}/searchs?${this.urlParamsSearch}`).
      toPromise().then(res => this.listRendezvous = res as Rendezvous[]);
  }
  
}
