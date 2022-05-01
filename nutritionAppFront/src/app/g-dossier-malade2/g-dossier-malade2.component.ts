import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlimentService } from '../shared/aliment.service';
import { ContrainteAlimentaireService } from '../shared/contrainte-alimentaire.service';
import { DossierPatientService } from '../shared/dossier-patient.service';
import { DossierPatient } from '../shared/dossierPatient';
import { PatientService } from '../shared/patient.service';
import { ResultatEnquete } from '../shared/resultat-enquete';
import { ResultatEnqueteService } from '../shared/resultat-enquete.service';

@Component({
  selector: 'app-g-dossier-malade2',
  templateUrl: './g-dossier-malade2.component.html',
  styleUrls: ['./g-dossier-malade2.component.scss']
})
export class GDossierMalade2Component implements OnInit {

  inputPetitDejVide=true
  inputDejVide=true
  inputDinerVide=true
  inputGrinotage=true

  listResultatEnquetebyId : ResultatEnquete ;
  displayView="view1"
  verifcationExistDossier:number
  dosPatient:any
  dosPatientSelectId:number

  patTailleinput1:string
  patTailleinput2:string

  autrePathologie=true
  autreAntecedentPersonnel=true
  sexePatient:string


  // Pdej
  formQuantitePetitDejeuner: FormGroup; 
  formQuantiteDejeuner: FormGroup; 
  formQuantiteDiner: FormGroup; 
  formQuantiteGrinotage: FormGroup; 

  
  get inputQuantitePetitDejeuner() {
    return this.formQuantitePetitDejeuner.get(
      'inputQuantitePetitDejeuner'
    ) as FormArray;
  }

  //Dej
  get inputQuantiteDejeuner() {
    return this.formQuantiteDejeuner.get(
      'inputQuantiteDejeuner'
    ) as FormArray;
  }

  get inputQuantiteDiner() {
    return this.formQuantiteDiner.get(
      'inputQuantiteDiner'
    ) as FormArray;
  }

  get inputQuantiteGrinotage() {
    return this.formQuantiteGrinotage.get(
      'inputQuantiteGrinotage'
    ) as FormArray;
  }
constructor(public router:Router,
  public fb:FormBuilder,
  public alimService:AlimentService,
  public dossPatService:DossierPatientService,
  public patService:PatientService,
  public toaster:ToastrService , 
  public resEnqueteService:ResultatEnqueteService,
  public contrainteAlimService:ContrainteAlimentaireService) { 

    this.formQuantitePetitDejeuner = new FormGroup({
      inputQuantitePetitDejeuner: new FormArray([]),
    });
    this.formQuantiteDejeuner = new FormGroup({
      inputQuantiteDejeuner: new FormArray([]),
    });
    this.formQuantiteDiner = new FormGroup({
      inputQuantiteDiner: new FormArray([]),
    });

    this.formQuantiteGrinotage = new FormGroup({
      inputQuantiteGrinotage: new FormArray([]),
    });

  }
  
  /** Formulaire Dossient Patient*/
  //1. Pathologie + Antécédents
  pathologieAnswer=["AAA"]
  pathologieOptions=["HTA","Diabète type 1","Diabète type 2","Hypercholestérolémie","Hypertriglycéridémie","Insuffisance rénale","Syndrome néphrotique","Problème hépatique","Maladie cardiovasculaire","Maladie coeliaque","RGO","Cancer","Anémie","Autre"]
  pathologieInput:string
  antecedentAnswer=["AAA"]
  antecedentOptions=["HTA","Diabète type 1","Diabète type 2","Hypercholestérolémie","Hypertriglycéridémie","Cancer","Autre"]
  antecedentInput:string
  antecedentFamiliauxInput:string
  //2. Historique de l'obésité
  typeObesite:string
  historiquePoidsMax:string 
  historiqueCircoPrisePoids:string 
  historiqueRegimeSuivi:string 
  historiquePertePonderale:string 
  historiqueCause:string 
  //3. Historique de Amaigrissement
  amaigrissementPoidsMin:string 
  amaigrissementNbeKgPerdus:string 
  amaigrissementPeriodePerte:string 
  amaigrissementCausePerte:string 
  //4. Historique Diabète
  historiquetypeDiabete:string
  historiquetraitement:string
  //5. Habitudes Alimentaires
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
  //6.TCA
  TCA:string
  inputTCA:string
  //7. Enquete Alimentaire  
 
  CaloriePetitDejeuner =0
  QuantitePetitDejeuner:string
  selectedpetitDejeuner: any = []; // petidej

  CalorieDejeuner=0
  QuantiteDejeuner:string
  selectedDejeuner: any = []; // dej
  

  CalorieDiner=0
  QuantiteDiner:string
  selectedDiner: any = []; // Diner


  CalorieGrinotage=0
  QuantiteGrinotage:string
  selectedGrinotage: any = []; // Grinotage


  nbreTotaleCalorie=0

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

   // variable de calculer Grinotage
  nbreTotaleCalorieGrinotage=0
  nbreTotaleGlucideGrinotage=0
  nbreTotaleLipideGrinotage=0
  nbreTotaleProtideGrinotage=0


  // variable de calculer le totale de la consomation
  nbreTotaleCalorieT=0
  nbreTotaleGlucideT=0
  nbreTotaleLipideT=0
  nbreTotaleProtideT=0

  /** Fin Formulaire Dossient Patient */

  changeViewAcceuilDossierPatient(){
    this.displayView="view1"
  }
  changeViewHistoriqueObesite(){
    this.displayView="view2"
  }

  changeViewHistoriqueAmaigrissement(){
    this.displayView="view3"
  }

  changeViewHistoriqueDiabete(){
    this.displayView="view4"
  }

  changeViewHistoriqueAlimentaire(){
    this.displayView="view5"
  }

  changeViewTroubleTCA(){
    this.displayView="view6"
  }

  changeViewEnqueteAlimentaire(){
    this.displayView="view7"
  }

  changeViewPathologiesAntecedent(){
    this.displayView="view8"
  }
  changeViewInfoPoidsTaille(){
    this.displayView="view9"
  }


  onDelete(id:number){    


    this.dossPatService.deleteDossierPatient(id).subscribe(
      res=>{
        this.resEnqueteService.deleteResultatEnqueteAlim(id).subscribe(
          res=>{
            this.toaster.success("Enquete Alimentaire supprimée avec succès","Suppression")
          },
          err => {
            this.toaster.error("Échec de supprimer Enquete Alimentaire","Suppression")
            console.log(err);
            }
        )
        this.patService.getPatient();
        this.toaster.success("Dossier Patient supprimé avec succès","Suppression")
        this.router.navigate(['malade']);
      
      },
      err => {
        this.toaster.error("Échec de supprimer Dossier Patient","Suppression")
        console.log(err);
        }
      );
      
      }

  ngOnInit(): void {

    // liste des aliments:
    this.alimService.getAliment()
    // list Enquete
    this.resEnqueteService.getResultatEnqueteAlimById(this.patService.idPatient).subscribe(
      res => {this.listResultatEnquetebyId = res as ResultatEnquete}
    )

    // Verification exist Dossier Patient    
    if(typeof this.patService.idPatient === 'undefined'){
      this.router.navigate(['malade']);
    }
    this.dossPatService.getDossierPatientVerif(this.patService.idPatient).subscribe((res)=>{
      this.dosPatient=res,
      console.log(res)
      console.log("Il existe un dossier de malade a ce patient")
      this.verifcationExistDossier=0
      this.dosPatientSelectId=this.dosPatient.dosId

    },
    (err) => {
      console.log("Il n'existe pas un dossier de malade a ce patient")
      this.verifcationExistDossier=1
      console.log(this.verifcationExistDossier)
     
    }
  )
    // Récupérer les informations des patients par leurs id 
    this.patService.getPatientById(this.patService.idPatient);

    // -- Enquete Alimentaire dynamic Form --
    this.formQuantitePetitDejeuner = this.fb.group({
      inputQuantitePetitDejeuner:this.fb.array([]),
      inputFrequencePetitDejeuner:this.fb.array([]),
    })

    this.formQuantiteDejeuner=this.fb.group({
      inputQuantiteDejeuner:this.fb.array([]),
      inputFrequenceDejeuner:this.fb.array([]),
    })

    this.formQuantiteDiner=this.fb.group({
      inputQuantiteDiner:this.fb.array([]),
      inputFrequenceDiner:this.fb.array([]),
    })

    this.formQuantiteGrinotage=this.fb.group({
      inputQuantiteGrinotage:this.fb.array([]),
      inputFrequenceGrinotage:this.fb.array([]),
    })
 
  }
  onSubmit(monform:NgForm){

    this.pathologieAnswer = this.pathologieAnswer.filter(item => item != "AAA");
    this.antecedentAnswer = this.antecedentAnswer.filter(item => item != "AAA");
    

    if(typeof this.pathologieInput !== "undefined"){

        this.pathologieAnswer.indexOf(this.pathologieInput) === -1 ? this.pathologieAnswer.push(this.pathologieInput) : console.log("This item already exists");
    }
    this.dossPatService.fromDataDossierPatient.dosPathologies =this.pathologieAnswer.toString();
    // View 2 : 
   this.dossPatService.fromDataDossierPatient.dosTypeObesite = this.typeObesite
  if(typeof this.antecedentInput !== "undefined" ){
    this.antecedentAnswer.indexOf(this.antecedentInput) === -1 ? this.antecedentAnswer.push(this.antecedentInput) : console.log("This item already exists");
  }
    this.dossPatService.fromDataDossierPatient.dosAntecedentsPersonnels =this.antecedentAnswer.toString();
    //this.dossPatService.fromDataDossierPatient.dosAntecedentsFamiliaux =this.antecedentFamiliauxInput;
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
    this.dossPatService.fromDataDossierPatient.dosHistoriqueAmaigrissement = this.amaigrissementPoidsMin + "," + this.amaigrissementNbeKgPerdus + "," + this.amaigrissementPeriodePerte + "," + this.amaigrissementCausePerte; // Normalement 4 variables mais puisque j'ai comis un faute dans la base de données donc je l'ai crée sous forme d'une table pour stocker dans une variable dans la base
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
   else{
     this.dossPatService.fromDataDossierPatient.dosTca = this.inputTCA
  }

   this.dossPatService.fromDataDossierPatient.dosPatientId=this.patService.idPatient

   this.resEnqueteService.fromData.enqAlimIdPatient=this.patService.idPatient
   console.log(this.dossPatService.fromDataDossierPatient)


     // Ajouter le poids / la taille / la toure de taille dans la table patient 
     this.patService.getPatientByIdResolver(this.patService.idPatient).subscribe(
      res=>{
        res.patTaille = parseFloat(this.patTailleinput1 + "." + this.patTailleinput2)
        res.patToureTaille = this.patService.fromData.patToureTaille
        res.patPoids = this.patService.fromData.patPoids
        res.patImc = this.patService.fromData.patImc


        this.patService.putPatientPoidsTaillePatient(res).subscribe(
          res2=>{
            console.log("Taille / poids / Tour de taille : sont a jour")
          }
        )
      })

   // Ajouter Dossier Patient
   
   this.dossPatService.addDossierPatient().subscribe(
    res=>{
      this.resetForm(monform);
      this.patService.getPatient();
      // Ajouter Resultat Enquete
      this.resEnqueteService.addResultatEnqueteAlim().subscribe(res=>{
      this.verifcationExistDossier=2
      this.toaster.success("Enquete Alimentaire ajoutée avec succès","Ajout")
      // this.router.navigate(['malade']); ////////////////////////////////////
      },
        err=>{console.log(err)}
        )
      this.toaster.success("Dossier Patient ajouté avec succès","Ajout")

    },
    err => {
      this.toaster.error("Échec d'ajouter dossier patient : "+ err.error.message,"Ajout")
      console.log(err);}
   )

  
        
  }

  resetForm(monForm:NgForm){
    monForm.form.reset();
    this.dossPatService.fromDataDossierPatient = new DossierPatient();
  }

  onChangePathologie(option:string,checked:boolean){
    if(option == "Autre"){
      this.autrePathologie=false
    }
    if(option != "Autre"){
      this.autrePathologie=true
    }

    if (checked && this.pathologieAnswer.indexOf(option)<0){
        this.pathologieAnswer=[...this.pathologieAnswer,option]
        .sort((a,b)=>this.pathologieOptions.indexOf(a)>this.pathologieOptions.indexOf(b)?1:-1)
    }
   if (!checked){ this.pathologieAnswer=this.pathologieAnswer.filter(x=>x!=option)}
 }

 onChangeAntecedent(option:string,checked:boolean){

  if(option=="Autre"){
    this.autreAntecedentPersonnel = false
  }
  if(option!="Autre"){
this.autreAntecedentPersonnel=true
  }
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

calculer(inputQuantite:any,inputFrequence:any,caloriesarray:any,glucidearray:any,lipidearray:any,protidearray:any,
  eauarray:any,fibreAlimentairearray:any,alcoolarray:any,agSaturesarray:any,agMonoinsaturesarray:any,agPolyinsaturesarray:any
  ,agW6Garray:any,gW3Garray:any,cholesterolMgarray:any,calciumMgarray:any,cuivreMgarray:any,ferMgarray:any,
  magnesiumMgarray:any,phosphoreMgarray:any,potassiumMgarray:any,sodiumMgarray:any,zincMgarray:any,retinolmgarray:any,
  vitamineDmgarray:any,vitamineEMgarray:any,vitamineK1mgarray:any,vitamineCMgarray:any,vitamineB1Mgarray:any,
  vitamineB2Mgarray:any,vitamineB3Mgarray:any,vitamineB5Mgarray:any,vitamineB6Mgarray:any,vitamineB9mgarray:any,vitamineB12mgarray:any){
  
  let nbreTotaleCalorie=0
  let nbreTotaleGlucide=0
  let nbreTotaleLipide=0
  let nbreTotaleProtide=0
  let nbreTotaleEau=0
  let nbreTotaleFibreAlimentaire=0
  let nbreTotaleAlcool=0
  let nbreTotaleAgSatures=0
  let nbreTotaleAgMonoinsatures=0
  let nbreTotaleAgPolyinsatures=0
  let nbreTotaleAgW6G=0
  let nbreTotaleGW3G=0
  let nbreTotaleCholesterolMg=0
  let nbreTotaleCalciumMg=0
  let nbreTotaleCuivreMg=0
  let nbreTotaleFerMg=0
  let nbreTotaleMagnesiumMg=0
  let nbreTotalePhosphoreMg=0
  let nbreTotalePotassiumMg=0
  let nbreTotaleSodiumMg=0
  let nbreTotaleZincMg=0
  let nbreTotaleRetinolmg=0
  let nbreTotaleVitamineDmg=0
  let nbreTotaleVitamineEMg=0
  let nbreTotaleVitamineK1mg=0
  let nbreTotaleVitamineCMg=0
  let nbreTotaleVitamineB1Mg=0
  let nbreTotaleVitamineB2Mg=0
  let nbreTotaleVitamineB3Mg=0
  let nbreTotaleVitamineB5Mg=0
  let nbreTotaleVitamineB6Mg=0
  let nbreTotaleVitamineB9mg=0
  let nbreTotaleVitamineB12mg=0


  this.resEnqueteService.fromData.ptDejProtide = this.nbreTotaleProtidePetitDej
  this.resEnqueteService.fromData.ptDejLipide =this.nbreTotaleLipidePetitDej
  this.resEnqueteService.fromData.ptDejGluicide = this.nbreTotaleGlucidePetitDej
  this.resEnqueteService.fromData.ptDejCalorie = this.nbreTotaleCaloriePetitDej

  this.resEnqueteService.fromData.dejProtide =this.nbreTotaleProtideDejeuner
  this.resEnqueteService.fromData.dejLipide = this.nbreTotaleLipideDejeuner
  this.resEnqueteService.fromData.dejGluicide =this.nbreTotaleGlucideDejeuner
  this.resEnqueteService.fromData.dejCalorie = this.nbreTotaleCalorieDejeuner

  this.resEnqueteService.fromData.dinerProtide = this.nbreTotaleProtideDiner
  this.resEnqueteService.fromData.dinerLipide = this.nbreTotaleLipideDiner
  this.resEnqueteService.fromData.dinerGluicide = this.nbreTotaleGlucideDiner
  this.resEnqueteService.fromData.dinerCalorie = this.nbreTotaleCalorieDiner

  this.resEnqueteService.fromData.grinotageProtide = this.nbreTotaleProtideGrinotage
  this.resEnqueteService.fromData.grinotageLipide = this.nbreTotaleLipideGrinotage
  this.resEnqueteService.fromData.grinotageGluicide = this.nbreTotaleGlucideGrinotage
  this.resEnqueteService.fromData.grinotageCalorie = this.nbreTotaleCalorieGrinotage

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



  // 5. Calcule Eau
  resNbeAlimentxQ=0
  for (let i = 0; i < eauarray.length; i++) {      
    resNbeAlimentxQ += ((Number(eauarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleEau=resNbeAlimentxQ
  // 6. Calcule Fibre Alimentaire
  resNbeAlimentxQ=0
  for (let i = 0; i < fibreAlimentairearray.length; i++) {      
    resNbeAlimentxQ += ((Number(fibreAlimentairearray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleFibreAlimentaire=resNbeAlimentxQ

  // 7. Calcule Alcool
  resNbeAlimentxQ=0
  for (let i = 0; i < alcoolarray.length; i++) {      
    resNbeAlimentxQ += ((Number(alcoolarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleAlcool=resNbeAlimentxQ
  // 8. Calcule agSatures
  resNbeAlimentxQ=0
  for (let i = 0; i < agSaturesarray.length; i++) {      
    resNbeAlimentxQ += ((Number(agSaturesarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleAgSatures=resNbeAlimentxQ
  // 9. Calcule agMonoinsatures
  resNbeAlimentxQ=0
  for (let i = 0; i < agMonoinsaturesarray.length; i++) {      
    resNbeAlimentxQ += ((Number(agMonoinsaturesarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}

  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleAgMonoinsatures=resNbeAlimentxQ
  // 10. Calcule agPolyinsatures
  resNbeAlimentxQ=0
  for (let i = 0; i < agPolyinsaturesarray.length; i++) {      
    resNbeAlimentxQ += ((Number(agPolyinsaturesarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleAgPolyinsatures=resNbeAlimentxQ

  // 11. Calcule agW6G
  resNbeAlimentxQ=0
  for (let i = 0; i < agW6Garray.length; i++) {      
    resNbeAlimentxQ += ((Number(agW6Garray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleAgW6G=resNbeAlimentxQ

  // 12. Calcule gW3G
  resNbeAlimentxQ=0
  for (let i = 0; i < gW3Garray.length; i++) {      
    resNbeAlimentxQ += ((Number(gW3Garray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleGW3G=resNbeAlimentxQ

  // 13. Calcule cholesterolMg
  resNbeAlimentxQ=0
  for (let i = 0; i < cholesterolMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(cholesterolMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleCholesterolMg=resNbeAlimentxQ
  // 14. Calcule calciumMg
  resNbeAlimentxQ=0
  for (let i = 0; i < calciumMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(calciumMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleCalciumMg=resNbeAlimentxQ

  // 15. Calcule cuivreMg
  resNbeAlimentxQ=0
  for (let i = 0; i < cuivreMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(cuivreMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleCuivreMg=resNbeAlimentxQ
  // 16. Calcule ferMg
  resNbeAlimentxQ=0
  for (let i = 0; i < ferMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(ferMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleFerMg=resNbeAlimentxQ

  // 17. Calcule magnesiumMg
  resNbeAlimentxQ=0
  for (let i = 0; i < magnesiumMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(magnesiumMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleMagnesiumMg=resNbeAlimentxQ

  // 18. Calcule phosphoreMg
  resNbeAlimentxQ=0
  for (let i = 0; i < phosphoreMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(phosphoreMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotalePhosphoreMg=resNbeAlimentxQ

  // 19. Calcule potassiumMg
  resNbeAlimentxQ=0
  for (let i = 0; i < potassiumMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(potassiumMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotalePotassiumMg=resNbeAlimentxQ

  // 20. Calcule sodiumMg
  resNbeAlimentxQ=0
  for (let i = 0; i < sodiumMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(sodiumMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleSodiumMg=resNbeAlimentxQ

  // 21. Calcule zincMg
  resNbeAlimentxQ=0
  for (let i = 0; i < zincMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(zincMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleZincMg=resNbeAlimentxQ

  // 22. Calcule retinolmg
  resNbeAlimentxQ=0
  for (let i = 0; i < retinolmgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(retinolmgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleRetinolmg=resNbeAlimentxQ

  // 23. Calcule vitamineDmg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineDmgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineDmgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleVitamineDmg=resNbeAlimentxQ

  // 24. Calcule vitamineEMg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineEMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineEMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleVitamineEMg=resNbeAlimentxQ

  // 25. Calcule vitamineK1mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineK1mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineK1mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleVitamineK1mg=resNbeAlimentxQ

  // 26. Calcule vitamineCMg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineCMgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineCMgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
  resNbeAlimentxQ=resNbeAlimentxQ/7
  nbreTotaleVitamineCMg=resNbeAlimentxQ

  // 27. Calcule vitamineB1Mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineB1Mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineB1Mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
resNbeAlimentxQ=resNbeAlimentxQ/7
nbreTotaleVitamineB1Mg=resNbeAlimentxQ

  // 28. Calcule vitamineB2Mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineB2Mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineB2Mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
resNbeAlimentxQ=resNbeAlimentxQ/7
nbreTotaleVitamineB2Mg=resNbeAlimentxQ

  // 29. Calcule vitamineB3Mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineB3Mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineB3Mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
resNbeAlimentxQ=resNbeAlimentxQ/7
nbreTotaleVitamineB3Mg=resNbeAlimentxQ

  //30. Calcule vitamineB5Mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineB5Mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineB5Mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
resNbeAlimentxQ=resNbeAlimentxQ/7
nbreTotaleVitamineB5Mg=resNbeAlimentxQ

  // 31. Calcule vitamineB6Mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineB6Mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineB6Mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
resNbeAlimentxQ=resNbeAlimentxQ/7
nbreTotaleVitamineB6Mg=resNbeAlimentxQ

  // 32. Calcule vitamineB9mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineB9mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineB9mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
resNbeAlimentxQ=resNbeAlimentxQ/7
nbreTotaleVitamineB9mg=resNbeAlimentxQ

  // 33. Calcule vitamineB12mg
  resNbeAlimentxQ=0
  for (let i = 0; i < vitamineB12mgarray.length; i++) {      
    resNbeAlimentxQ += ((Number(vitamineB12mgarray[i]) * inputQuantite[i])/100)*inputFrequence[i]
}
resNbeAlimentxQ=resNbeAlimentxQ/7
nbreTotaleVitamineB12mg=resNbeAlimentxQ


 return {nbreTotaleCalorie,
 nbreTotaleGlucide,
 nbreTotaleLipide,
 nbreTotaleProtide,
 nbreTotaleEau,
 nbreTotaleFibreAlimentaire,
 nbreTotaleAlcool,
 nbreTotaleAgSatures,
 nbreTotaleAgMonoinsatures,
 nbreTotaleAgPolyinsatures,
 nbreTotaleAgW6G,
 nbreTotaleGW3G,
 nbreTotaleCholesterolMg,
 nbreTotaleCalciumMg,
 nbreTotaleCuivreMg,
 nbreTotaleFerMg,
 nbreTotaleMagnesiumMg,
 nbreTotalePhosphoreMg,
 nbreTotalePotassiumMg,
 nbreTotaleSodiumMg,
 nbreTotaleZincMg,
 nbreTotaleRetinolmg,
 nbreTotaleVitamineDmg,
 nbreTotaleVitamineEMg,
 nbreTotaleVitamineK1mg,
 nbreTotaleVitamineCMg,
 nbreTotaleVitamineB1Mg,
 nbreTotaleVitamineB2Mg,
 nbreTotaleVitamineB3Mg,
 nbreTotaleVitamineB5Mg,
 nbreTotaleVitamineB6Mg,
 nbreTotaleVitamineB9mg,
 nbreTotaleVitamineB12mg };
}

diviserInputsValues(selectedInputValues:any){
  var selectedString=String(selectedInputValues).replace(",","");
  var selectedSplited = selectedString.split("+").slice(0, -1); 

  var caloriesarray=[]
  var glucidearray=[]
  var lipidearray=[]
  var protidearray=[]
  var eauarray=[]
  var fibreAlimentairearray=[]
  var alcoolarray=[]
  var agSaturesarray=[]
  var agMonoinsaturesarray=[]
  var agPolyinsaturesarray=[]
  var agW6Garray=[]
  var gW3Garray=[]
  var cholesterolMgarray=[]
  var calciumMgarray=[]
  var cuivreMgarray=[]
  var ferMgarray=[]
  var magnesiumMgarray=[]
  var phosphoreMgarray=[]
  var potassiumMgarray=[]
  var sodiumMgarray=[]
  var zincMgarray=[]
  var retinolmgarray=[]
  var vitamineDmgarray=[]
  var vitamineEMgarray=[]
  var vitamineK1mgarray=[]
  var vitamineCMgarray=[]
  var vitamineB1Mgarray=[]
  var vitamineB2Mgarray=[]
  var vitamineB3Mgarray=[]
  var vitamineB5Mgarray=[]
  var vitamineB6Mgarray=[]
  var vitamineB9mgarray=[]
  var vitamineB12mgarray=[]

  for(let item of selectedSplited ){ 
    item = item.replace(",","")  
    var itemSplited=item.split("/")
    caloriesarray.push(itemSplited[0])
    glucidearray.push(itemSplited[1])
    lipidearray.push(itemSplited[2])
    protidearray.push(itemSplited[3])
    eauarray.push(itemSplited[4])
    fibreAlimentairearray.push(itemSplited[5])
    alcoolarray.push(itemSplited[6])
    agSaturesarray.push(itemSplited[7])
    agMonoinsaturesarray.push(itemSplited[8])
    agPolyinsaturesarray.push(itemSplited[9])
    agW6Garray.push(itemSplited[10])
    gW3Garray.push(itemSplited[11])
    cholesterolMgarray.push(itemSplited[12])
    calciumMgarray.push(itemSplited[13])
    cuivreMgarray.push(itemSplited[14])
    ferMgarray.push(itemSplited[15])
    magnesiumMgarray.push(itemSplited[16])
    phosphoreMgarray.push(itemSplited[17])
    potassiumMgarray.push(itemSplited[18])
    sodiumMgarray.push(itemSplited[19])
    zincMgarray.push(itemSplited[20])
    retinolmgarray.push(itemSplited[21])
    vitamineDmgarray.push(itemSplited[22])
    vitamineEMgarray.push(itemSplited[23])
    vitamineK1mgarray.push(itemSplited[24])
    vitamineCMgarray.push(itemSplited[25])
    vitamineB1Mgarray.push(itemSplited[26])
    vitamineB2Mgarray.push(itemSplited[27])
    vitamineB3Mgarray.push(itemSplited[28])
    vitamineB5Mgarray.push(itemSplited[29])
    vitamineB6Mgarray.push(itemSplited[30])
    vitamineB9mgarray.push(itemSplited[30])
    vitamineB12mgarray.push(itemSplited[30])
  }

  return {caloriesarray,glucidearray,lipidearray,protidearray,
    eauarray,fibreAlimentairearray,alcoolarray,agSaturesarray,agMonoinsaturesarray,agPolyinsaturesarray,
    agW6Garray,gW3Garray,cholesterolMgarray,calciumMgarray,cuivreMgarray,ferMgarray,magnesiumMgarray,
    phosphoreMgarray,potassiumMgarray,sodiumMgarray,zincMgarray,retinolmgarray,vitamineDmgarray,
    vitamineEMgarray,vitamineK1mgarray,vitamineCMgarray,vitamineB1Mgarray,vitamineB2Mgarray,vitamineB3Mgarray,
    vitamineB5Mgarray,vitamineB6Mgarray,vitamineB9mgarray,vitamineB12mgarray}
}

calculerTousNutriments(inputQuantite:any,inputFrequence:any,selectedRepas:any){


var calorie=this.calculer(inputQuantite,inputFrequence,
  this.diviserInputsValues(selectedRepas).caloriesarray,
  this.diviserInputsValues(selectedRepas).glucidearray,
  this.diviserInputsValues(selectedRepas).lipidearray,
  this.diviserInputsValues(selectedRepas).protidearray,
  this.diviserInputsValues(selectedRepas).eauarray,
  this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
  this.diviserInputsValues(selectedRepas).alcoolarray,
  this.diviserInputsValues(selectedRepas).agSaturesarray,
  this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
  this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
  this.diviserInputsValues(selectedRepas).agW6Garray,
  this.diviserInputsValues(selectedRepas).gW3Garray,
  this.diviserInputsValues(selectedRepas).cholesterolMgarray,
  this.diviserInputsValues(selectedRepas).calciumMgarray,
  this.diviserInputsValues(selectedRepas).cuivreMgarray,
  this.diviserInputsValues(selectedRepas).ferMgarray,
  this.diviserInputsValues(selectedRepas).magnesiumMgarray,
  this.diviserInputsValues(selectedRepas).phosphoreMgarray,
  this.diviserInputsValues(selectedRepas).potassiumMgarray,
  this.diviserInputsValues(selectedRepas).sodiumMgarray,
  this.diviserInputsValues(selectedRepas).zincMgarray,
  this.diviserInputsValues(selectedRepas).retinolmgarray,
  this.diviserInputsValues(selectedRepas).vitamineDmgarray,
  this.diviserInputsValues(selectedRepas).vitamineEMgarray,
  this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
  this.diviserInputsValues(selectedRepas).vitamineCMgarray,
  this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleCalorie


var glucide=this.calculer(inputQuantite,inputFrequence,
  this.diviserInputsValues(selectedRepas).caloriesarray,
  this.diviserInputsValues(selectedRepas).glucidearray,
  this.diviserInputsValues(selectedRepas).lipidearray,
  this.diviserInputsValues(selectedRepas).protidearray,
  this.diviserInputsValues(selectedRepas).eauarray,
  this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
  this.diviserInputsValues(selectedRepas).alcoolarray,
  this.diviserInputsValues(selectedRepas).agSaturesarray,
  this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
  this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
  this.diviserInputsValues(selectedRepas).agW6Garray,
  this.diviserInputsValues(selectedRepas).gW3Garray,
  this.diviserInputsValues(selectedRepas).cholesterolMgarray,
  this.diviserInputsValues(selectedRepas).calciumMgarray,
  this.diviserInputsValues(selectedRepas).cuivreMgarray,
  this.diviserInputsValues(selectedRepas).ferMgarray,
  this.diviserInputsValues(selectedRepas).magnesiumMgarray,
  this.diviserInputsValues(selectedRepas).phosphoreMgarray,
  this.diviserInputsValues(selectedRepas).potassiumMgarray,
  this.diviserInputsValues(selectedRepas).sodiumMgarray,
  this.diviserInputsValues(selectedRepas).zincMgarray,
  this.diviserInputsValues(selectedRepas).retinolmgarray,
  this.diviserInputsValues(selectedRepas).vitamineDmgarray,
  this.diviserInputsValues(selectedRepas).vitamineEMgarray,
  this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
  this.diviserInputsValues(selectedRepas).vitamineCMgarray,
  this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleGlucide

var lipide=this.calculer(inputQuantite,inputFrequence,
  this.diviserInputsValues(selectedRepas).caloriesarray,
  this.diviserInputsValues(selectedRepas).glucidearray,
  this.diviserInputsValues(selectedRepas).lipidearray,
  this.diviserInputsValues(selectedRepas).protidearray,
  this.diviserInputsValues(selectedRepas).eauarray,
  this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
  this.diviserInputsValues(selectedRepas).alcoolarray,
  this.diviserInputsValues(selectedRepas).agSaturesarray,
  this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
  this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
  this.diviserInputsValues(selectedRepas).agW6Garray,
  this.diviserInputsValues(selectedRepas).gW3Garray,
  this.diviserInputsValues(selectedRepas).cholesterolMgarray,
  this.diviserInputsValues(selectedRepas).calciumMgarray,
  this.diviserInputsValues(selectedRepas).cuivreMgarray,
  this.diviserInputsValues(selectedRepas).ferMgarray,
  this.diviserInputsValues(selectedRepas).magnesiumMgarray,
  this.diviserInputsValues(selectedRepas).phosphoreMgarray,
  this.diviserInputsValues(selectedRepas).potassiumMgarray,
  this.diviserInputsValues(selectedRepas).sodiumMgarray,
  this.diviserInputsValues(selectedRepas).zincMgarray,
  this.diviserInputsValues(selectedRepas).retinolmgarray,
  this.diviserInputsValues(selectedRepas).vitamineDmgarray,
  this.diviserInputsValues(selectedRepas).vitamineEMgarray,
  this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
  this.diviserInputsValues(selectedRepas).vitamineCMgarray,
  this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleLipide

var protide=this.calculer(inputQuantite,inputFrequence,
  this.diviserInputsValues(selectedRepas).caloriesarray,
  this.diviserInputsValues(selectedRepas).glucidearray,
  this.diviserInputsValues(selectedRepas).lipidearray,
  this.diviserInputsValues(selectedRepas).protidearray,
  this.diviserInputsValues(selectedRepas).eauarray,
  this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
  this.diviserInputsValues(selectedRepas).alcoolarray,
  this.diviserInputsValues(selectedRepas).agSaturesarray,
  this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
  this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
  this.diviserInputsValues(selectedRepas).agW6Garray,
  this.diviserInputsValues(selectedRepas).gW3Garray,
  this.diviserInputsValues(selectedRepas).cholesterolMgarray,
  this.diviserInputsValues(selectedRepas).calciumMgarray,
  this.diviserInputsValues(selectedRepas).cuivreMgarray,
  this.diviserInputsValues(selectedRepas).ferMgarray,
  this.diviserInputsValues(selectedRepas).magnesiumMgarray,
  this.diviserInputsValues(selectedRepas).phosphoreMgarray,
  this.diviserInputsValues(selectedRepas).potassiumMgarray,
  this.diviserInputsValues(selectedRepas).sodiumMgarray,
  this.diviserInputsValues(selectedRepas).zincMgarray,
  this.diviserInputsValues(selectedRepas).retinolmgarray,
  this.diviserInputsValues(selectedRepas).vitamineDmgarray,
  this.diviserInputsValues(selectedRepas).vitamineEMgarray,
  this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
  this.diviserInputsValues(selectedRepas).vitamineCMgarray,
  this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleProtide

var eau=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleEau

var fibreAlimentaire=this.calculer(inputQuantite,inputFrequence,
      this.diviserInputsValues(selectedRepas).caloriesarray,
      this.diviserInputsValues(selectedRepas).glucidearray,
      this.diviserInputsValues(selectedRepas).lipidearray,
      this.diviserInputsValues(selectedRepas).protidearray,
      this.diviserInputsValues(selectedRepas).eauarray,
      this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
      this.diviserInputsValues(selectedRepas).alcoolarray,
      this.diviserInputsValues(selectedRepas).agSaturesarray,
      this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
      this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
      this.diviserInputsValues(selectedRepas).agW6Garray,
      this.diviserInputsValues(selectedRepas).gW3Garray,
      this.diviserInputsValues(selectedRepas).cholesterolMgarray,
      this.diviserInputsValues(selectedRepas).calciumMgarray,
      this.diviserInputsValues(selectedRepas).cuivreMgarray,
      this.diviserInputsValues(selectedRepas).ferMgarray,
      this.diviserInputsValues(selectedRepas).magnesiumMgarray,
      this.diviserInputsValues(selectedRepas).phosphoreMgarray,
      this.diviserInputsValues(selectedRepas).potassiumMgarray,
      this.diviserInputsValues(selectedRepas).sodiumMgarray,
      this.diviserInputsValues(selectedRepas).zincMgarray,
      this.diviserInputsValues(selectedRepas).retinolmgarray,
      this.diviserInputsValues(selectedRepas).vitamineDmgarray,
      this.diviserInputsValues(selectedRepas).vitamineEMgarray,
      this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
      this.diviserInputsValues(selectedRepas).vitamineCMgarray,
      this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
      this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
      this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
      this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
      this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
      this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleFibreAlimentaire

var alcool=this.calculer(inputQuantite,inputFrequence,
        this.diviserInputsValues(selectedRepas).caloriesarray,
        this.diviserInputsValues(selectedRepas).glucidearray,
        this.diviserInputsValues(selectedRepas).lipidearray,
        this.diviserInputsValues(selectedRepas).protidearray,
        this.diviserInputsValues(selectedRepas).eauarray,
        this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
        this.diviserInputsValues(selectedRepas).alcoolarray,
        this.diviserInputsValues(selectedRepas).agSaturesarray,
        this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
        this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
        this.diviserInputsValues(selectedRepas).agW6Garray,
        this.diviserInputsValues(selectedRepas).gW3Garray,
        this.diviserInputsValues(selectedRepas).cholesterolMgarray,
        this.diviserInputsValues(selectedRepas).calciumMgarray,
        this.diviserInputsValues(selectedRepas).cuivreMgarray,
        this.diviserInputsValues(selectedRepas).ferMgarray,
        this.diviserInputsValues(selectedRepas).magnesiumMgarray,
        this.diviserInputsValues(selectedRepas).phosphoreMgarray,
        this.diviserInputsValues(selectedRepas).potassiumMgarray,
        this.diviserInputsValues(selectedRepas).sodiumMgarray,
        this.diviserInputsValues(selectedRepas).zincMgarray,
        this.diviserInputsValues(selectedRepas).retinolmgarray,
        this.diviserInputsValues(selectedRepas).vitamineDmgarray,
        this.diviserInputsValues(selectedRepas).vitamineEMgarray,
        this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
        this.diviserInputsValues(selectedRepas).vitamineCMgarray,
        this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
        this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
        this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
        this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
        this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
        this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleAlcool

var agSatures=this.calculer(inputQuantite,inputFrequence,
          this.diviserInputsValues(selectedRepas).caloriesarray,
          this.diviserInputsValues(selectedRepas).glucidearray,
          this.diviserInputsValues(selectedRepas).lipidearray,
          this.diviserInputsValues(selectedRepas).protidearray,
          this.diviserInputsValues(selectedRepas).eauarray,
          this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
          this.diviserInputsValues(selectedRepas).alcoolarray,
          this.diviserInputsValues(selectedRepas).agSaturesarray,
          this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
          this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
          this.diviserInputsValues(selectedRepas).agW6Garray,
          this.diviserInputsValues(selectedRepas).gW3Garray,
          this.diviserInputsValues(selectedRepas).cholesterolMgarray,
          this.diviserInputsValues(selectedRepas).calciumMgarray,
          this.diviserInputsValues(selectedRepas).cuivreMgarray,
          this.diviserInputsValues(selectedRepas).ferMgarray,
          this.diviserInputsValues(selectedRepas).magnesiumMgarray,
          this.diviserInputsValues(selectedRepas).phosphoreMgarray,
          this.diviserInputsValues(selectedRepas).potassiumMgarray,
          this.diviserInputsValues(selectedRepas).sodiumMgarray,
          this.diviserInputsValues(selectedRepas).zincMgarray,
          this.diviserInputsValues(selectedRepas).retinolmgarray,
          this.diviserInputsValues(selectedRepas).vitamineDmgarray,
          this.diviserInputsValues(selectedRepas).vitamineEMgarray,
          this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
          this.diviserInputsValues(selectedRepas).vitamineCMgarray,
          this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
          this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
          this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
          this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
          this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
          this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleAgSatures

var agMonoinsatures=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleAgMonoinsatures

var agPolyinsatures=this.calculer(inputQuantite,inputFrequence,
  this.diviserInputsValues(selectedRepas).caloriesarray,
  this.diviserInputsValues(selectedRepas).glucidearray,
  this.diviserInputsValues(selectedRepas).lipidearray,
  this.diviserInputsValues(selectedRepas).protidearray,
  this.diviserInputsValues(selectedRepas).eauarray,
  this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
  this.diviserInputsValues(selectedRepas).alcoolarray,
  this.diviserInputsValues(selectedRepas).agSaturesarray,
  this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
  this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
  this.diviserInputsValues(selectedRepas).agW6Garray,
  this.diviserInputsValues(selectedRepas).gW3Garray,
  this.diviserInputsValues(selectedRepas).cholesterolMgarray,
  this.diviserInputsValues(selectedRepas).calciumMgarray,
  this.diviserInputsValues(selectedRepas).cuivreMgarray,
  this.diviserInputsValues(selectedRepas).ferMgarray,
  this.diviserInputsValues(selectedRepas).magnesiumMgarray,
  this.diviserInputsValues(selectedRepas).phosphoreMgarray,
  this.diviserInputsValues(selectedRepas).potassiumMgarray,
  this.diviserInputsValues(selectedRepas).sodiumMgarray,
  this.diviserInputsValues(selectedRepas).zincMgarray,
  this.diviserInputsValues(selectedRepas).retinolmgarray,
  this.diviserInputsValues(selectedRepas).vitamineDmgarray,
  this.diviserInputsValues(selectedRepas).vitamineEMgarray,
  this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
  this.diviserInputsValues(selectedRepas).vitamineCMgarray,
  this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleAgPolyinsatures

var agW6G=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleAgW6G

var agW3G=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleGW3G

var cholesterolMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleCholesterolMg

var calciumMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleCalciumMg

var cuivreMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleCuivreMg

var ferMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleFerMg

var magnesiumMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleMagnesiumMg

var phosphoreMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotalePhosphoreMg

var potassiumMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotalePotassiumMg

var sodiumMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleSodiumMg

var zincMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleZincMg

var retinolmg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleRetinolmg

var vitamineDmg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineDmg

var vitamineEMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineEMg

var vitamineK1mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineK1mg

var vitamineCMg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineCMg

var vitamineB1Mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineB1Mg

var vitamineB2Mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineB2Mg

var vitamineB3Mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineB3Mg

var vitamineB5Mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineB5Mg

var vitamineB6Mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineB6Mg

var vitamineB9mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineB9mg

var vitamineB12mg=this.calculer(inputQuantite,inputFrequence,
    this.diviserInputsValues(selectedRepas).caloriesarray,
    this.diviserInputsValues(selectedRepas).glucidearray,
    this.diviserInputsValues(selectedRepas).lipidearray,
    this.diviserInputsValues(selectedRepas).protidearray,
    this.diviserInputsValues(selectedRepas).eauarray,
    this.diviserInputsValues(selectedRepas).fibreAlimentairearray,
    this.diviserInputsValues(selectedRepas).alcoolarray,
    this.diviserInputsValues(selectedRepas).agSaturesarray,
    this.diviserInputsValues(selectedRepas).agMonoinsaturesarray,
    this.diviserInputsValues(selectedRepas).agPolyinsaturesarray,
    this.diviserInputsValues(selectedRepas).agW6Garray,
    this.diviserInputsValues(selectedRepas).gW3Garray,
    this.diviserInputsValues(selectedRepas).cholesterolMgarray,
    this.diviserInputsValues(selectedRepas).calciumMgarray,
    this.diviserInputsValues(selectedRepas).cuivreMgarray,
    this.diviserInputsValues(selectedRepas).ferMgarray,
    this.diviserInputsValues(selectedRepas).magnesiumMgarray,
    this.diviserInputsValues(selectedRepas).phosphoreMgarray,
    this.diviserInputsValues(selectedRepas).potassiumMgarray,
    this.diviserInputsValues(selectedRepas).sodiumMgarray,
    this.diviserInputsValues(selectedRepas).zincMgarray,
    this.diviserInputsValues(selectedRepas).retinolmgarray,
    this.diviserInputsValues(selectedRepas).vitamineDmgarray,
    this.diviserInputsValues(selectedRepas).vitamineEMgarray,
    this.diviserInputsValues(selectedRepas).vitamineK1mgarray,
    this.diviserInputsValues(selectedRepas).vitamineCMgarray,
    this.diviserInputsValues(selectedRepas).vitamineB1Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB2Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB3Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB5Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB6Mgarray,
    this.diviserInputsValues(selectedRepas).vitamineB9mgarray,
  this.diviserInputsValues(selectedRepas).vitamineB12mgarray).nbreTotaleVitamineB12mg

return {calorie,glucide,lipide,protide,eau,fibreAlimentaire,alcool,agSatures,agMonoinsatures,agPolyinsatures,agW6G,agW3G,cholesterolMg,calciumMg,cuivreMg,ferMg,magnesiumMg,phosphoreMg,potassiumMg,sodiumMg,zincMg,retinolmg,vitamineDmg,vitamineEMg,vitamineK1mg,vitamineCMg,vitamineB1Mg,vitamineB2Mg,vitamineB3Mg,vitamineB5Mg,vitamineB6Mg,vitamineB9mg,vitamineB12mg}
}

onCalcule(){
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

  // Grinotage
  this.nbreTotaleCalorieGrinotage=this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).calorie
  this.nbreTotaleGlucideGrinotage=this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).glucide
  this.nbreTotaleLipideGrinotage=this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).lipide 
  this.nbreTotaleProtideGrinotage=this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).protide

  // Totaux
  this.nbreTotaleCalorieT=this.nbreTotaleCaloriePetitDej + this.nbreTotaleCalorieDejeuner + this.nbreTotaleCalorieDiner + this.nbreTotaleCalorieGrinotage
  this.nbreTotaleGlucideT=((this.nbreTotaleGlucidePetitDej + this.nbreTotaleGlucideDejeuner + this.nbreTotaleGlucideDiner + this.nbreTotaleGlucideGrinotage)*100)/this.nbreTotaleCalorieT
  this.nbreTotaleLipideT=((this.nbreTotaleLipidePetitDej + this.nbreTotaleLipideDejeuner + this.nbreTotaleLipideDiner + this.nbreTotaleLipideGrinotage )*100)/this.nbreTotaleCalorieT
  this.nbreTotaleProtideT=((this.nbreTotaleProtidePetitDej + this.nbreTotaleProtideDejeuner + this.nbreTotaleProtideDiner +  this.nbreTotaleProtideGrinotage)*100)/this.nbreTotaleCalorieT

  // Resultat Enquete Alimentaire
  this.resEnqueteService.fromData.energieKcal100G=this.nbreTotaleCalorieT
  this.resEnqueteService.fromData.glucidesG100G= this.nbreTotaleGlucideT
  this.resEnqueteService.fromData.lipidesG100G = this.nbreTotaleLipideT
  this.resEnqueteService.fromData.proteinesG100G=this.nbreTotaleProtideT
  
  this.resEnqueteService.fromData.calciumMg100G=
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).calciumMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).calciumMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).calciumMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).calciumMg // Somme calciumMg100G: Dej + petidéj + Diner : calciumMg100G
  this.resEnqueteService.fromData.eauG100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).eau + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).eau + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).eau + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).eau
  this.resEnqueteService.fromData.fibresAlimentairesG100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).fibreAlimentaire + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).fibreAlimentaire + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).fibreAlimentaire + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).fibreAlimentaire
  this.resEnqueteService.fromData.alcoolG100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).alcool + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).alcool + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).alcool + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).alcool
  this.resEnqueteService.fromData.agSaturesG100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).agSatures + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).agSatures + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).agSatures + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).agSatures
  this.resEnqueteService.fromData.agMonoinsaturesG100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).agMonoinsatures + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).agMonoinsatures + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).agMonoinsatures + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).agMonoinsatures
  this.resEnqueteService.fromData.agPolyinsaturesG100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).agPolyinsatures + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).agPolyinsatures + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).agPolyinsatures +  this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).agPolyinsatures
  this.resEnqueteService.fromData.agW6G100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).agW6G + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).agW6G + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).agW6G + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).agW6G
  this.resEnqueteService.fromData.agW3G100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).agW3G + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).agW3G + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).agW3G + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).agW3G
  this.resEnqueteService.fromData.cholesterolMg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).cholesterolMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).cholesterolMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).cholesterolMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).cholesterolMg
  this.resEnqueteService.fromData.cuivreMg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).cuivreMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).cuivreMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).cuivreMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).cuivreMg
  this.resEnqueteService.fromData.ferMg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).ferMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).ferMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).ferMg +  this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).ferMg
  this.resEnqueteService.fromData.magnesiumMg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).magnesiumMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).magnesiumMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).magnesiumMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).magnesiumMg
  this.resEnqueteService.fromData.phosphoreMg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).phosphoreMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).phosphoreMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).phosphoreMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).phosphoreMg
  this.resEnqueteService.fromData.potassiumMg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).potassiumMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).potassiumMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).potassiumMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).potassiumMg
  this.resEnqueteService.fromData.sodiumMg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).sodiumMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).sodiumMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).sodiumMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).sodiumMg
  this.resEnqueteService.fromData.zincMg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).zincMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).zincMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).zincMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).zincMg
  this.resEnqueteService.fromData.retinolmg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).retinolmg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).retinolmg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).retinolmg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).retinolmg
  this.resEnqueteService.fromData.vitamineDmg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineDmg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineDmg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineDmg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineDmg
  this.resEnqueteService.fromData.vitamineEMg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineEMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineEMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineEMg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineEMg
  this.resEnqueteService.fromData.vitamineK1mg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineK1mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineK1mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineK1mg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineK1mg
  this.resEnqueteService.fromData.vitamineCMg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineCMg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineCMg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineCMg  + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineCMg
  this.resEnqueteService.fromData.vitamineB1Mg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineB1Mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineB1Mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineB1Mg +  this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineB1Mg
  this.resEnqueteService.fromData.vitamineB2Mg100G =  
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineB2Mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineB2Mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineB2Mg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineB2Mg
  this.resEnqueteService.fromData.vitamineB3Mg100G  =
   this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineB3Mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineB3Mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineB3Mg +  this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineB3Mg 
  this.resEnqueteService.fromData.vitamineB5Mg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineB5Mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineB5Mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineB5Mg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineB5Mg
  this.resEnqueteService.fromData.vitamineB6Mg100G  = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineB6Mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineB6Mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineB6Mg +  this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineB6Mg
  this.resEnqueteService.fromData.vitamineB9mg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineB9mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineB9mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineB9mg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineB9mg
  this.resEnqueteService.fromData.vitamineB12mg100G = 
  this.calculerTousNutriments(this.getQteFreqPetitdej().qteArray,this.getQteFreqPetitdej().freqArray,this.selectedpetitDejeuner).vitamineB12mg + this.calculerTousNutriments(this.getQteFreqdej().qteArray,this.getQteFreqdej().freqArray,this.selectedDejeuner).vitamineB12mg + this.calculerTousNutriments(this.getQteFreqdiner().qteArray,this.getQteFreqdiner().freqArray,this.selectedDiner).vitamineB12mg + this.calculerTousNutriments(this.getQteFreqgrinotage().qteArray,this.getQteFreqgrinotage().freqArray,this.selectedGrinotage).vitamineB12mg
  

  console.log("calciumMg100G",this.resEnqueteService.fromData.calciumMg100G)
  console.log("eauG100G",this.resEnqueteService.fromData.eauG100G)
  console.log("fibresAlimentairesG100G",this.resEnqueteService.fromData.fibresAlimentairesG100G)
  console.log("alcoolG100G",this.resEnqueteService.fromData.alcoolG100G)
  console.log("agMonoinsaturesG100G",this.resEnqueteService.fromData.agMonoinsaturesG100G)
  console.log("agPolyinsaturesG100G",this.resEnqueteService.fromData.agPolyinsaturesG100G)
  console.log("agW6G100G",this.resEnqueteService.fromData.agW6G100G)
  console.log("agW3G100G",this.resEnqueteService.fromData.agW3G100G)
  console.log("cholesterolMg100G",this.resEnqueteService.fromData.cholesterolMg100G)
  console.log("cuivreMg100G",this.resEnqueteService.fromData.cuivreMg100G)
  console.log("ferMg100G",this.resEnqueteService.fromData.ferMg100G)
  console.log("magnesiumMg100G",this.resEnqueteService.fromData.magnesiumMg100G)
  console.log("phosphoreMg100G",this.resEnqueteService.fromData.phosphoreMg100G)
  console.log("potassiumMg100G",this.resEnqueteService.fromData.potassiumMg100G)
  console.log("sodiumMg100G",this.resEnqueteService.fromData.sodiumMg100G)
  console.log("zincMg100G",this.resEnqueteService.fromData.zincMg100G)
  console.log("retinolmg100G",this.resEnqueteService.fromData.retinolmg100G)
  console.log("vitamineDmg100G",this.resEnqueteService.fromData.vitamineDmg100G)
  console.log("vitamineEMg100G",this.resEnqueteService.fromData.vitamineEMg100G)
  console.log("vitamineK1mg100G",this.resEnqueteService.fromData.vitamineK1mg100G)
  console.log("vitamineCMg100G",this.resEnqueteService.fromData.vitamineCMg100G)
  console.log("vitamineB1Mg100G",this.resEnqueteService.fromData.vitamineB1Mg100G)
  console.log("calciumMg100G",this.resEnqueteService.fromData.calciumMg100G)
  console.log("calciumMg100G",this.resEnqueteService.fromData.calciumMg100G)
  console.log("vitamineB2Mg100G",this.resEnqueteService.fromData.vitamineB2Mg100G)
  console.log("vitamineB3Mg100G",this.resEnqueteService.fromData.vitamineB3Mg100G)
  console.log("vitamineB5Mg100G",this.resEnqueteService.fromData.vitamineB5Mg100G)
  console.log("vitamineB6Mg100G",this.resEnqueteService.fromData.vitamineB6Mg100G)
  console.log("vitamineB9mg100G",this.resEnqueteService.fromData.vitamineB9mg100G)
  console.log("vitamineB12mg100G",this.resEnqueteService.fromData.vitamineB12mg100G)
 

  this.resEnqueteService.fromData.enqAlimIdPatient = this.patService.idPatient

}

//////////////////////////////////////////////////////////////
  //Petit dejeuner
//////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////
  //Déjeuner
//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////
  //Diner
//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////
  //Grinotage
//////////////////////////////////////////////////////////////
addgrinotageInputs() {
  this.inputQuantiteGrinotage.push(
    new FormGroup({
      qte: new FormControl(''),
      freq: new FormControl(''),
    })
  );
}

addInputsQuantiteGrinotage() {
  this.addgrinotageInputs();
  this.verificationGrinotage();
}

resetSelectgrinotage() {
  this.inputQuantiteGrinotage.clear();
}

onRemovegrinotage() {
  this.inputQuantiteGrinotage.removeAt(this.selectedGrinotage.length);
}

getQteFreqgrinotage() {
  let values: any = [];
  let qteArray = [];
  let freqArray = [];
  this.inputQuantiteGrinotage.controls.forEach((control) => {
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

verificationGrinotage() {
  let values: any = [];
  let countqte = 0;
  let countfreq = 0;

  if ( this.selectedGrinotage.length == countqte && this.selectedGrinotage.length == countfreq) {
    return false;
  }

  try {
    if (this.selectedGrinotage.length != 0) {


      this.inputQuantiteGrinotage.controls.forEach((control) => {
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
      if ( this.selectedGrinotage.length == countqte && this.selectedGrinotage.length == countfreq) {
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

////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////

verificationDisabledButtonCalculer(){

  if( this.verificationPetiDej()==false  && this.verificationDej()==false   && this.verificationDiner() ==false && this.verificationGrinotage() == false ){
    return false
  }
    return true
}


verificationDisabledButtonConfirm(){
    if( this.selectedDiner.length ==0  && this.selectedpetitDejeuner.length==0   && this.selectedDejeuner.length ==0 && this.selectedGrinotage.length ==0 ){
      return true
    }
    if(this.verificationDisabledButtonCalculer()){
      return true
    }
      return false
  }


  calculeIMC(){
    let taille=parseFloat(this.patTailleinput1 + "." + this.patTailleinput2)
    let imc:string
    if(this.patService.fromData.patPoids != 0 && this.patTailleinput1 !=undefined ){
      imc = (this.patService.fromData.patPoids / (taille * taille)).toFixed(2)
      this.patService.fromData.patImc = Number(imc)
    }

  }

  onChangeViewAllToPatients(){
    this.router.navigate(['malade']);  }


}
