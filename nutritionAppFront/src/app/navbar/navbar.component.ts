import { Component, OnInit } from '@angular/core';
import data from '../config/appSettings.json';
import { UtilisateurService } from '../shared/utilisateur.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userService:UtilisateurService) { }
  roleLoginUtilisateur=0
  roleAdmine=Number(data.userRoleIndb.admin_id)
  roleUtilisateur =Number(data.userRoleIndb.utilisateur_id)

  ngOnInit(): void {
    this.roleLoginUtilisateur=this.userService.getUserLoginInformation().decodedRole
  }

}
