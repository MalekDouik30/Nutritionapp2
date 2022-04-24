import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Role } from './role';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpClient) { }
  readonly baseURL = environment.role_url;
  listRole : Role[] | undefined;
  fromData:Role = new Role();


  getRole(){
    this.http.get(this.baseURL).subscribe(
      res => this.listRole = res as Role[])
  }

  getRoleById(id:number):Observable<Object>{
    return this.http.get(`${this.baseURL}/${id}`)
  }

  putRole(){
    return this.http.put(`${this.baseURL}/${this.fromData.rolId}`, this.fromData);
  }

  deleteRole(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  addRole(){
    this.fromData.rolEtat=true
    return this.http.post(this.baseURL, this.fromData);
  }

}
