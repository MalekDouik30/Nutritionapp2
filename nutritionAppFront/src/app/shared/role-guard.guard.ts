import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private router: Router,private utiservice:UtilisateurService,private jwtHelper :JwtHelperService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      return this.checkUserLogin(route);
      //return true;
  }

  checkUserRole(){
    return this.utiservice.getUserLoginInformation().decodedRole
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    const  userRole = this.checkUserRole()
    
    if (route.data.role && route.data.role.indexOf(userRole) === -1){
      this.router.navigate(['']);
      return false
    }

    const token = localStorage.getItem("jwt")  || '{}' ;   
    if( this.jwtHelper.isTokenExpired(token)){
      this.router.navigate(['']);
      return false;   
    }
    return true;
  }
  
}
