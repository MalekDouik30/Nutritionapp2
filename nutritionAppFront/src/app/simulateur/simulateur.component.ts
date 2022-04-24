import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlimentService } from '../shared/aliment.service';

@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.component.html',
  styleUrls: ['./simulateur.component.scss'],
})
export class SimulateurComponent implements OnInit {

  formQuantitePetitDejeuner: FormGroup; 
  formQuantiteDejeuner: FormGroup; 
  formQuantiteDiner: FormGroup; 

  // variable de calculer Petit Dej
  nbreTotaleCaloriePetitDej=0
  nbreTotaleGlucidePetitDej=0
  nbreTotaleLipidePetitDej=0
  nbreTotaleProtidePetitDej=0
  
  // variable de calculer Dejeuner
  nbreTotaleCalorieDejeuner=0
  nbreTotaleGlucideDejeuner=0
  nbreTotaleLipideDejeuner=0
  nbreTotaleProtideDejeuner=0
  
  // variable de calculer Diner
  nbreTotaleCalorieDiner=0
  nbreTotaleGlucideDiner=0
  nbreTotaleLipideDiner=0
  nbreTotaleProtideDiner=0
  
  // variable de calculer le totale de la consomation
  nbreTotaleCalorieT=0
  nbreTotaleGlucideT=0
  nbreTotaleLipideT=0
  nbreTotaleProtideT=0

  constructor(public alimService: AlimentService, private fb: FormBuilder) {

    this.formQuantitePetitDejeuner = new FormGroup({
      
      inputQuantitePetitDejeuner: new FormArray([]),
    });

    this.formQuantiteDejeuner = new FormGroup({
      inputQuantiteDejeuner: new FormArray([]),
    });

    this.formQuantiteDiner = new FormGroup({
      inputQuantiteDiner: new FormArray([]),
    });
  }

  selectedpetitDejeuner: any = []; 
  selectedDejeuner: any = []; // dej
  selectedDiner: any = []; // dej

  ngOnInit() {
    this.alimService.getAliment();
  }

  get inputQuantitePetitDejeuner() {
    // 
    return this.formQuantitePetitDejeuner.get(
      'inputQuantitePetitDejeuner'
    ) as FormArray;
  }

  addPtdjInputs() {
    this.inputQuantitePetitDejeuner.push(
      new FormGroup({
        qte: new FormControl(''),
        freq: new FormControl(''),
      })
    );
  }

  addInputsQuantitePetitDej() {
    this.addPtdjInputs();
    this.verificationPetiDej();
  }

  resetSelectPtdj() {
    this.inputQuantitePetitDejeuner.clear();
  }

  onRemovePtdj() {
    this.inputQuantitePetitDejeuner.removeAt(this.selectedpetitDejeuner.length);
  }

  getQteFreqPetitdej() {
    let values: any = [];
    let qteArray = [];
    let freqArray = [];
    this.inputQuantitePetitDejeuner.controls.forEach((control) => {
      values.push(control.value);
    });
    for (let item of values) {
      if (item.qte != null) {
        qteArray.push(item.qte);
      }
      if (item.freq != null) {
        freqArray.push(item.freq);
      }
    }
    return {
      qteArray,
      freqArray,
    };
  }

  verificationPetiDej() {
    let values: any = [];
    let countqte = 0;
    let countfreq = 0;
  
    if (this.selectedpetitDejeuner.length == countqte &&this.selectedpetitDejeuner.length == countfreq) {
      return false;
    } 
  
    try {
      if (this.selectedpetitDejeuner.length != 0) {
  
  
        this.inputQuantitePetitDejeuner.controls.forEach((control) => {
          values.push(control.value);
        });
        for (let item of values) {
          if (item.qte != '') {
            countqte = countqte + 1;
          }
          if (item.freq != '') {
            countfreq = countfreq + 1;
          }
        }
        if (
          this.selectedpetitDejeuner.length == countqte &&
          this.selectedpetitDejeuner.length == countfreq
        ) {
          return false;
          // disabled = false
        } else {  
          return true;
          // disabled = true
        }
      } else {
        return true;
      }
    } catch {
  
      return true;
    }
  }

  // Dej : ----------------------------------
  get inputQuantiteDejeuner() {
    return this.formQuantiteDejeuner.get(
      'inputQuantiteDejeuner'
    ) as FormArray;
  }

  adddjInputs() {
    this.inputQuantiteDejeuner.push(
      new FormGroup({
        qte: new FormControl(''),
        freq: new FormControl(''),
      })
    );
  }

  addInputsQuantiteDej() {
    this.adddjInputs();
    this.verificationDej();
  }

  resetSelectdj() {
    this.inputQuantiteDejeuner.clear();
  }

  onRemovedj() {
    this.inputQuantiteDejeuner.removeAt(this.selectedDejeuner.length);
  }

  getQteFreqdej() {
    let values: any = [];
    let qteArray = [];
    let freqArray = [];
    this.inputQuantiteDejeuner.controls.forEach((control) => {
      values.push(control.value);
    });
    for (let item of values) {
      if (item.qte != null) {
        qteArray.push(item.qte);
      }
      if (item.freq != null) {
        freqArray.push(item.freq);
      }
    }
    return {
      qteArray,
      freqArray,
    };
  }

  verificationDej() {
    let values: any = [];
    let countqte = 0;
    let countfreq = 0;
    if ( this.selectedDejeuner.length == countqte && this.selectedDejeuner.length == countfreq) {
      return false;
    }
  
    try {
      if (this.selectedDejeuner.length != 0) {
  
  
        this.inputQuantiteDejeuner.controls.forEach((control) => {
          values.push(control.value);
        });
        for (let item of values) {
          if (item.qte != '') {
            countqte = countqte + 1;
          }
          if (item.freq != '') {
            countfreq = countfreq + 1;
          }
        }
        if (
          this.selectedDejeuner.length == countqte &&
          this.selectedDejeuner.length == countfreq
        ) {
          return false;
          // disabled = false
        } else {
  
  
          return true;
          // disabled = true
        }
      } else {
        return true;
      }
    } catch {
      return true;
    }
  }

  // Diner : ----------------------------------
  get inputQuantiteDiner() {
    return this.formQuantiteDiner.get(
      'inputQuantiteDiner'
    ) as FormArray;
  }

  adddinerInputs() {
    this.inputQuantiteDiner.push(
      new FormGroup({
        qte: new FormControl(''),
        freq: new FormControl(''),
      })
    );
  }

  addInputsQuantiteDiner() {
    this.adddinerInputs();
    this.verificationDiner();
  }

  resetSelectdiner() {
    this.inputQuantiteDiner.clear();
  }

  onRemovediner() {
    this.inputQuantiteDiner.removeAt(this.selectedDiner.length);
  }

  getQteFreqdiner() {
    let values: any = [];
    let qteArray = [];
    let freqArray = [];
    this.inputQuantiteDiner.controls.forEach((control) => {
      values.push(control.value);
    });
    for (let item of values) {
      if (item.qte != null) {
        qteArray.push(item.qte);
      }
      if (item.freq != null) {
        freqArray.push(item.freq);
      }
    }
    return {
      qteArray,
      freqArray,
    };
  }

  verificationDiner() {
    let values: any = [];
    let countqte = 0;
    let countfreq = 0;
  
    if ( this.selectedDiner.length == countqte && this.selectedDiner.length == countfreq) {
      return false;
    }
  
    try {
      if (this.selectedDiner.length != 0) {
  
  
        this.inputQuantiteDiner.controls.forEach((control) => {
          values.push(control.value);
        });
        for (let item of values) {
          if (item.qte != '') {
            countqte = countqte + 1;
          }
          if (item.freq != '') {
            countfreq = countfreq + 1;
          }
        }
        if ( this.selectedDiner.length == countqte && this.selectedDiner.length == countfreq) {
          return false;
          // disabled = false
        } else {
          return true;
          // disabled = true
        }
      } else {
        return true;
      }
    } catch {
      return true;
    }
  }

verificationDisabledButton(){

  if( this.verificationPetiDej()==false  && this.verificationDej()==false   && this.verificationDiner() ==false ){
    return false
  }
    return true
}



diviserInputsValues(selectedInputValues:any){
  var selectedString=String(selectedInputValues).replace(",","");
  var selectedSplited = selectedString.split("+").slice(0, -1); 

  var caloriesarray=[]
  var glucidearray=[]
  var lipidearray=[]
  var protidearray=[]

  for(let item of selectedSplited ){ 
    item = item.replace(",","")  
    var itemSplited=item.split("/")
    caloriesarray.push(itemSplited[0])
    glucidearray.push(itemSplited[1])
    lipidearray.push(itemSplited[2])
    protidearray.push(itemSplited[3])
  }
  return {caloriesarray,glucidearray,lipidearray,protidearray}

}


calculer(inputQuantite:any,inputFrequence:any,caloriesarray:any,glucidearray:any,lipidearray:any,protidearray:any){
  let nbreTotaleCalorie=0
  let nbreTotaleGlucide=0
  let nbreTotaleLipide=0
  let nbreTotaleProtide=0

  var resNbeAlimentxQ=0
  for (let i = 0; i < caloriesarray.length; i++) {      
    resNbeAlimentxQ += ((Number(caloriesarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
  }
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleCalorie=resNbeAlimentxQ

  // 2. Calcule Glucide
  resNbeAlimentxQ=0
  for (let i = 0; i < glucidearray.length; i++) {      
    resNbeAlimentxQ += ((Number(glucidearray[i]) * inputQuantite[i])/100)*inputFrequence[i]
  }
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleGlucide=resNbeAlimentxQ

  // 3. Calcule Lipide
  resNbeAlimentxQ=0
  for (let i = 0; i < lipidearray.length; i++) {      
    resNbeAlimentxQ += ((Number(lipidearray[i]) * inputQuantite[i])/100)* inputFrequence[i]
  }
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleLipide=resNbeAlimentxQ

  // 4. Calcule Protidie
  resNbeAlimentxQ=0
  for (let i = 0; i < protidearray.length; i++) {      
      resNbeAlimentxQ += ((Number(protidearray[i]) * inputQuantite[i])/100)*inputFrequence[i]
  }
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleProtide=resNbeAlimentxQ

  return{nbreTotaleCalorie,nbreTotaleGlucide,nbreTotaleLipide,nbreTotaleProtide }

}

calculerTousNutriments(inputQuantite:any,inputFrequence:any,selectedRepas:any){

  var calorie=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray).nbreTotaleCalorie
  
  
  var glucide=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray).nbreTotaleGlucide
  
  var lipide=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray).nbreTotaleLipide
  
  var protide=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray).nbreTotaleProtide

    return {calorie,glucide,lipide,protide}
  }


  onCalcule() {
      // PetitDej 
  this.nbreTotaleCaloriePetitDej=this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).calorie
  this.nbreTotaleGlucidePetitDej=this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).glucide
  this.nbreTotaleLipidePetitDej=this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).lipide 
  this.nbreTotaleProtidePetitDej=this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).protide

  // Déj 
  this.nbreTotaleCalorieDejeuner=this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).calorie
  this.nbreTotaleGlucideDejeuner=this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).glucide
  this.nbreTotaleLipideDejeuner=this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).lipide 
  this.nbreTotaleProtideDejeuner=this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).protide
  
  // Diner
  this.nbreTotaleCalorieDiner=this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).calorie
  this.nbreTotaleGlucideDiner=this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).glucide
  this.nbreTotaleLipideDiner=this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).lipide 
  this.nbreTotaleProtideDiner=this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).protide

  // Totaux
  this.nbreTotaleCalorieT=this.nbreTotaleCaloriePetitDej + this.nbreTotaleCalorieDejeuner + this.nbreTotaleCalorieDiner
  this.nbreTotaleGlucideT=((this.nbreTotaleGlucidePetitDej + this.nbreTotaleGlucideDejeuner + this.nbreTotaleGlucideDiner)*100)/this.nbreTotaleCalorieT
  this.nbreTotaleLipideT=((this.nbreTotaleLipidePetitDej + this.nbreTotaleLipideDejeuner + this.nbreTotaleLipideDiner)*100)/this.nbreTotaleCalorieT
  this.nbreTotaleProtideT=((this.nbreTotaleProtidePetitDej + this.nbreTotaleProtideDejeuner + this.nbreTotaleProtideDiner)*100)/this.nbreTotaleCalorieT

  }
}
