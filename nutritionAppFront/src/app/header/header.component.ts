import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../shared/utilisateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router,public utiService:UtilisateurService) { }
  nomUtilisateur:string

  logOut(){
    localStorage.removeItem("jwt");
    this.router.navigate(["login"]);
  }
  ngOnInit(): void {
    this.nomUtilisateur= this.utiService.getUserLoginInformation().decodedName
  }



}
