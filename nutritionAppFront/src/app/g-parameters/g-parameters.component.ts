import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Parametre } from '../shared/parametre';
import { ParametreService } from '../shared/parametre.service';
import { ModifierParameterComponent } from './modifier-parameter/modifier-parameter.component';
@Component({
  selector: 'app-g-parameters',
  templateUrl: './g-parameters.component.html',
  styleUrls: ['./g-parameters.component.scss']
})
export class GParametersComponent implements OnInit {

  constructor(public paramService:ParametreService, public dialog:MatDialog) { }

  onSelection(SelectedRecord:Parametre){
    this.paramService.fromData=  Object.assign({},SelectedRecord);
    this.dialog.open(ModifierParameterComponent);
  }

  ngOnInit(): void {
    this.paramService.getParametres();
  }

}
