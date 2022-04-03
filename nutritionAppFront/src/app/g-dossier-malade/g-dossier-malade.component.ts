import { Component, OnInit } from '@angular/core';
import { PatientService } from '../shared/patient.service';
import { DossierPatientService } from '../shared/dossier-patient.service';
import { AlimentService } from '../shared/aliment.service';
import { FormBuilder, NgForm,FormGroup, FormArray} from '@angular/forms';
import {DossierPatient}  from '../shared/dossierPatient';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-g-dossier-malade',
  templateUrl: './g-dossier-malade.component.html',
  styleUrls: ['./g-dossier-malade.component.scss']
})
export class GDossierMaladeComponent implements OnInit {

  formQuantitePetitDejeuner :FormGroup;
  get inputQuantitePetitDejeuner(){
    return this.formQuantitePetitDejeuner.get('inputQuantitePetitDejeuner') as FormArray;
  }

  get inputFrequencePetitDejeuner(){
    return this.formQuantitePetitDejeuner.get('inputFrequencePetitDejeuner') as FormArray;
  }
  constructor(public fb:FormBuilder,public alimService:AlimentService,public dialog:MatDialog,public patService:PatientService,public dossPatService:DossierPatientService,public toaster:ToastrService) { }

    dosPatient:any
    dosPatientSelectId:number
  /*********************************************************************** */
    pathologieAnswer=["HTA"]
    pathologieOptions=["HTA","Diabète type 1","Diabète type 2","Hypercholestérolémie","Hypertriglycéridémie","Insuffisance rénale","Syndrome néphrotique",
  "Problème hépatique","Maladie cardiovasculaire","Maladie coeliaque","RGO","Cancer","Anémie"]
    pathologieInput:string
    //----
    antecedentAnswer=["HTA"]
    antecedentOptions=["HTA","Diabète type 1","Diabète type 2","Hypercholestérolémie","Hypertriglycéridémie","Cancer"]
    antecedentInput:string
     //----
     antecedentFamiliauxInput:string
     //----
     historiquePoidsMax:string 
     historiqueCircoPrisePoids:string 
     historiqueRegimeSuivi:string 
     historiquePertePonderale:string 
     historiqueCause:string 
     //----
     historiquetypeDiabete:string
     historiquetraitement:string
     //----
     amaigrissementPoidsMin:string 
     amaigrissementNbeKgPerdus:string 
     amaigrissementPeriodePerte:string 
     amaigrissementCausePerte:string 
     //----
     habitudePrefGustative:string  
     habitudeAlcool:string
     habitudeAlcoolQuantite:string
     habitudeTabac:string
     habitudeTabacQuantite:string
     habitudeOuRepasAnswer=["A la maison"]
     habitudeOuRepasOptions=["A la maison","Vous ramenez avec vous des plats faits maison","Dans un restaurant","Fast food"]
     habitudeOuRepasInput:string
     habitudeNbreRepasJour:number
     habitudeTypeRepas:string
     habitudeProblemeMastication:string
     habitudeQteEau:string
     habitudeDosSport:string
     habitudeTypeSport:string
     habitudeDureSport:string
     habitudeFrequenceSport:string
     //----
     TCA:string
     inputTCA:string
     //---
     ParamPoids:number
     ParamTaille:number
     ParamTour_taille:number

  /*********************************************************************** */
   // Enquete Alimentaire
   CaloriePetitDejeuner =0
   QuantitePetitDejeuner:string
   selectedpetitDejeuner = [];
  
   CalorieDejeuner=0
   QuantiteDejeuner:string
   selectedDejeuner = [];

   CalorieDiner=0
   QuantiteDiner:string
   selectedDiner = [];

   nbreTotaleCalorie=0
   nbreTotaleCaloriePetitDej=0
   nbreTotaleGlucidePetitDej=0
   nbreTotaleLipidePetitDej=0
   nbreTotaleProtidePetitDej=0

   verifcationVar:boolean

  onSubmit(monform:NgForm){
  // View 1 : 
    if(typeof this.pathologieInput !== "undefined"){
      this.pathologieAnswer.indexOf(this.pathologieInput) === -1 ? this.pathologieAnswer.push(this.pathologieInput) : console.log("This item already exists");
    }
    this.dossPatService.fromDataDossierPatient.dosPathologies =this.pathologieAnswer.toString();
    // View 2 : 
  if(typeof this.antecedentInput !== "undefined"){
    this.antecedentAnswer.indexOf(this.antecedentInput) === -1 ? this.antecedentAnswer.push(this.antecedentInput) : console.log("This item already exists");
  }
    this.dossPatService.fromDataDossierPatient.dosAntecedentsPersonnels =this.antecedentAnswer.toString();
    this.dossPatService.fromDataDossierPatient.dosAntecedentsFamiliaux =this.antecedentFamiliauxInput;
    // View 3 : 
    this.dossPatService.fromDataDossierPatient.dosPoidsMaximal=parseFloat(this.historiquePoidsMax)
    this.dossPatService.fromDataDossierPatient.dosCirconstancePrisePoids = this.historiqueCircoPrisePoids
    this.dossPatService.fromDataDossierPatient.dosRegime=this.historiqueRegimeSuivi
    this.dossPatService.fromDataDossierPatient.dosPerteRegime = this.historiquePertePonderale
    this.dossPatService.fromDataDossierPatient.dosCauseArretRegime = this.historiqueCause
    // View 4 : 
    this.dossPatService.fromDataDossierPatient.dosDiabete= this.historiquetypeDiabete
    this.dossPatService.fromDataDossierPatient.dosTraitementDiabete= this.historiquetraitement
    // View 5 : 
    this.dossPatService.fromDataDossierPatient.dosHistoriqueAmaigrissement = this.amaigrissementPoidsMin + "," + this.amaigrissementNbeKgPerdus + "," + this.amaigrissementPeriodePerte + "," + this.amaigrissementCausePerte; // Normalement 4 variables mais puisque j'ai comis un faute dans la base de données donc je l'ai crée sous forme d'un table pour stocker dans une variable dans la base
    // View 6: 
    this.dossPatService.fromDataDossierPatient.dosPreferencesGustatives = this.habitudePrefGustative
    this.dossPatService.fromDataDossierPatient.dosAlcool =this.habitudeAlcool
    this.dossPatService.fromDataDossierPatient.dosQuantiteAlcool = this.habitudeAlcoolQuantite
    if(typeof this.habitudeOuRepasInput !== "undefined"){
      this.habitudeOuRepasAnswer.indexOf(this.habitudeOuRepasInput) === -1 ? this.habitudeOuRepasAnswer.push(this.habitudeOuRepasInput) : console.log("This item already exists");
    }
    this.dossPatService.fromDataDossierPatient.dosLieuxRepas =this.habitudeOuRepasAnswer.toString();
    this.dossPatService.fromDataDossierPatient.dosNombreRepas =this.habitudeNbreRepasJour
    this.dossPatService.fromDataDossierPatient.dosTabac=this.habitudeTabac
    this.dossPatService.fromDataDossierPatient.dosQuantiteTabac=this.habitudeTabacQuantite
    this.dossPatService.fromDataDossierPatient.dosTypeRepas = this.habitudeTypeRepas
    this.dossPatService.fromDataDossierPatient.dosProblemeMastication  = this.habitudeProblemeMastication
    this.dossPatService.fromDataDossierPatient.dosQuantiteEau=this.habitudeQteEau
    if(this.habitudeDosSport=="Oui"){this.dossPatService.fromDataDossierPatient.dosSport=true}
    if(this.habitudeDosSport=="Non"){this.dossPatService.fromDataDossierPatient.dosSport=false}
    this.dossPatService.fromDataDossierPatient.dosTypeSport=this.habitudeTypeSport
    this.dossPatService.fromDataDossierPatient.dosDureeSport=this.habitudeDureSport
    this.dossPatService.fromDataDossierPatient.dosFrequenceSport=this.habitudeFrequenceSport
   // View 7:
   if(typeof this.TCA !== "undefined"){this.dossPatService.fromDataDossierPatient.dosTca=this.TCA}
   else{this.dossPatService.fromDataDossierPatient.dosTca = this.inputTCA}
   

   this.dossPatService.fromDataDossierPatient.dosPatientId=this.patService.idPatient
   // Ajouter webservice :
   this.dossPatService.addDossierPatient().subscribe(
    res=>{
      this.resetForm(monform);
      this.patService.getPatient();
      this.toaster.success("Patient ajouté avec succès","Ajout")},
    err => {
      this.toaster.error("Échec d'ajouter patient : "+ err.error.message,"Ajout")
      console.log(err);}
   )

    console.log(this.dossPatService.fromDataDossierPatient.dosPathologies)
    console.log(this.dossPatService.fromDataDossierPatient.dosAntecedentsPersonnels)
    console.log(this.dossPatService.fromDataDossierPatient.dosAntecedentsFamiliaux)
    console.log(this.dossPatService.fromDataDossierPatient.dosPoidsMaximal)
    console.log(this.dossPatService.fromDataDossierPatient.dosCirconstancePrisePoids)
    console.log(this.dossPatService.fromDataDossierPatient.dosRegime)
    console.log(this.dossPatService.fromDataDossierPatient.dosPerteRegime)
    console.log(this.dossPatService.fromDataDossierPatient.dosCauseArretRegime)
    console.log(this.dossPatService.fromDataDossierPatient.dosDiabete)
    console.log(this.dossPatService.fromDataDossierPatient.dosTraitementDiabete)
    console.log(this.dossPatService.fromDataDossierPatient.dosHistoriqueAmaigrissement)
    console.log(this.dossPatService.fromDataDossierPatient.dosPreferencesGustatives)
    console.log(this.dossPatService.fromDataDossierPatient.dosAlcool)
    console.log(this.dossPatService.fromDataDossierPatient.dosQuantiteAlcool)
    console.log(this.dossPatService.fromDataDossierPatient.dosLieuxRepas)
    console.log(this.dossPatService.fromDataDossierPatient.dosNombreRepas)
    console.log(this.dossPatService.fromDataDossierPatient.dosTabac)
    console.log( this.dossPatService.fromDataDossierPatient.dosQuantiteTabac)
    console.log(this.dossPatService.fromDataDossierPatient.dosProblemeMastication)
    console.log(this.dossPatService.fromDataDossierPatient.dosTypeRepas)
    console.log(this.dossPatService.fromDataDossierPatient.dosQuantiteEau)
    console.log(this.dossPatService.fromDataDossierPatient.dosSport)
    console.log(this.dossPatService.fromDataDossierPatient.dosTypeSport)
    console.log(this.dossPatService.fromDataDossierPatient.dosDureeSport)
    console.log(this.dossPatService.fromDataDossierPatient.dosFrequenceSport)
    console.log(this.dossPatService.fromDataDossierPatient.dosTca)

    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")

    console.log(this.dossPatService.fromDataDossierPatient)
  }

  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.dossPatService.fromDataDossierPatient = new DossierPatient();
  }

  ngOnInit(): void { 
    // List des aliments :
    this.alimService.getAliment()
    this.dossPatService.getDossierPatientVerif(this.patService.idPatient).subscribe((res)=>{
        this.dosPatient=res,
        console.log(res)
        console.log("Il existe un dossier de malade a ce patient")
        this.verifcationVar=false
        this.dosPatientSelectId=this.dosPatient.dosId

      },
      (err) => {
        console.log("Il n'existe pas un dossier de malade a ce patient")
        this.verifcationVar=true
        console.log(this.verifcationVar)
      }
    )

    // 
    this.formQuantitePetitDejeuner = this.fb.group({
      inputQuantitePetitDejeuner:this.fb.array([]),
      inputFrequencePetitDejeuner:this.fb.array([]),

    })
  }

  onChangePathologie(option:string,checked:boolean){
     if (checked && this.pathologieAnswer.indexOf(option)<0){
         this.pathologieAnswer=[...this.pathologieAnswer,option]
         .sort((a,b)=>this.pathologieOptions.indexOf(a)>this.pathologieOptions.indexOf(b)?1:-1)
     }
    if (!checked){ this.pathologieAnswer=this.pathologieAnswer.filter(x=>x!=option)}
  }
  onChangeAntecedent(option:string,checked:boolean){
    if (checked && this.antecedentAnswer.indexOf(option)<0){
        this.antecedentAnswer=[...this.antecedentAnswer,option]
        .sort((a,b)=>this.antecedentOptions.indexOf(a)>this.antecedentOptions.indexOf(b)?1:-1)
    }
   if (!checked){ this.antecedentAnswer=this.antecedentAnswer.filter(x=>x!=option)}
 }

 onChangehabitudeOuRepas(option:string,checked:boolean){
  if (checked && this.habitudeOuRepasAnswer.indexOf(option)<0){
      this.habitudeOuRepasAnswer=[...this.habitudeOuRepasAnswer,option]
      .sort((a,b)=>this.habitudeOuRepasOptions.indexOf(a)>this.habitudeOuRepasOptions.indexOf(b)?1:-1)
  }
 if (!checked){ this.habitudeOuRepasAnswer=this.habitudeOuRepasAnswer.filter(x=>x!=option)}
}

onDelete(id:number){
  this.dossPatService.deleteDossierPatient(id).subscribe(
    res=>{
      this.patService.getPatient();
      this.toaster.success("Dossier Patient supprimé avec succès","Suppression")
      this.dialog.closeAll()
    },
    err => {
      this.toaster.error("Échec de supprimer Dossier Patient","Suppression")
      console.log(err);
      }
    );
    }


  closeDialog(){
    this.dialog.closeAll()
  }


  onCalcule(){
    alert("La liste des quantites  : "+this.inputQuantitePetitDejeuner.value)
    alert("La liste des Fréquences : "+this.inputFrequencePetitDejeuner.value)

    var selectedpetitDejeunerString=String(this.selectedpetitDejeuner).replace(",","");
    var selectedpetitDejeunerSplited = selectedpetitDejeunerString.split("+").slice(0, -1); 
    var caloriesarray=[]
    var glucidearray=[]
    var lipidearray=[]
    var protidearray=[]

    for(let item of selectedpetitDejeunerSplited ){ 
      item = item.replace(",","")  
      var itemSplited=item.split("/")
      caloriesarray.push(itemSplited[0])
      glucidearray.push(itemSplited[1])
      lipidearray.push(itemSplited[2])
      protidearray.push(itemSplited[3])
    }

    // 1. Calcule Calories
    // somme[([ Nbe Calorie Aliment A (par 100g) * Quantité ] / 100)*Fréquence]
    var resNbeAlimentxQ=0
    for (let i = 0; i < caloriesarray.length; i++) {      
      resNbeAlimentxQ += ((Number(caloriesarray[i]) * this.inputQuantitePetitDejeuner.value[i])/100)*this.inputFrequencePetitDejeuner.value[i]
    }
    resNbeAlimentxQ=resNbeAlimentxQ/7
    this.nbreTotaleCaloriePetitDej=resNbeAlimentxQ
    // 2. Calcule Glucide
    for (let i = 0; i < glucidearray.length; i++) {      
      resNbeAlimentxQ += ((Number(glucidearray[i]) * this.inputQuantitePetitDejeuner.value[i])/100)*this.inputFrequencePetitDejeuner.value[i]
    }
    resNbeAlimentxQ=resNbeAlimentxQ/7
    this.nbreTotaleGlucidePetitDej=resNbeAlimentxQ
    // 3. Calcule Lipide
    for (let i = 0; i < lipidearray.length; i++) {      
      resNbeAlimentxQ += ((Number(lipidearray[i]) * this.inputQuantitePetitDejeuner.value[i])/100)*this.inputFrequencePetitDejeuner.value[i]
    }
    resNbeAlimentxQ=resNbeAlimentxQ/7
    this.nbreTotaleLipidePetitDej=resNbeAlimentxQ
    // 4. Calcule Lipide
    for (let i = 0; i < protidearray.length; i++) {      
        resNbeAlimentxQ += ((Number(lipidearray[i]) * this.inputQuantitePetitDejeuner.value[i])/100)*this.inputFrequencePetitDejeuner.value[i]
    }
    resNbeAlimentxQ=resNbeAlimentxQ/7
    this.nbreTotaleProtidePetitDej=resNbeAlimentxQ



  }
  
  addInputsQuantite(){

    this.formQuantitePetitDejeuner = this.fb.group({
      inputQuantitePetitDejeuner:this.fb.array([]),
      inputFrequencePetitDejeuner:this.fb.array([]),
    })

    for(let item of this.selectedpetitDejeuner){
      this.inputQuantitePetitDejeuner.push(this.fb.control(''));
      this.inputFrequencePetitDejeuner.push(this.fb.control(''));

    }


  }

  


}

