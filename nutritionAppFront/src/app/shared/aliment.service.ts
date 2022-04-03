import { Injectable } from '@angular/core';
import data from '../config/appSettings.json';
import { HttpClient } from '@angular/common/http';
import { Aliment } from './aliment';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  constructor(private http:HttpClient) { }
  readonly baseURL = data.back_webservices.aliment_url;

  listAliments : Aliment[] ;
  fromData:Aliment = new Aliment();

  getAliment(){
    this.http.get(`${this.baseURL}`).toPromise().then(
      res => { this.listAliments = res as Aliment[] });   
  }
}
