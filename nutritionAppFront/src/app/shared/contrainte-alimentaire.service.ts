import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContrainteAlimentaire } from './contrainteAlimentaire';
@Injectable({
  providedIn: 'root'
})
export class ContrainteAlimentaireService {

  constructor(public http:HttpClient) { }
  readonly baseURL = environment.contrainteAlim_url;
  listContrainteAlimentaire : ContrainteAlimentaire[] | undefined;

  getResultatContrainteAlimentaire(){
    this.http.get(this.baseURL).subscribe(res => this.listContrainteAlimentaire = res as ContrainteAlimentaire[])
  }

  getResultatContrainteAlimentaireByNutrimetResolver(aliment:string):Observable<ContrainteAlimentaire[]>{
    //return this.http.get(this.baseURL+"/"+aliment).subscribe(res => this.listContrainteAlimentaire = res as ContrainteAlimentaire[])
    return this.http.get<ContrainteAlimentaire[]>(this.baseURL+"/"+aliment);
  }
}
