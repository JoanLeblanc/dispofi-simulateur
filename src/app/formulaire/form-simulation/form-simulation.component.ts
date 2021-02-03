import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-simulation',
  templateUrl: './form-simulation.component.html',
  styleUrls: ['./form-simulation.component.scss']
})
export class FormSimulationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { 
  }

  simulationForm!: FormGroup;
  mensualiteGlobale: number = 0;
  mensualiteAssurance: number = 0;
  coutCredit: number = 0;

  ngOnInit(): void {

  this.simulationForm = this.formBuilder.group({
    montant: new FormControl(null, Validators.required),
    duree: new FormControl(20),
    interet: new FormControl(null, Validators.required),
    assurance: new FormControl (null, Validators.required)
  })
  }

  calculMensualite() {
    if(this.montant && this.interet && this.assurance && this.duree) {
      let tauxInteret = this.interet.value
      // On vérifie que la valeur de l'input interet soit bien de type number
      if(isNaN(tauxInteret)) {
        // Sinon on remplace la virgule décimale de la valeur par un point décimal
        tauxInteret = +tauxInteret.toString().replace(',', '.')
      }
      let tauxAssurance = this.assurance.value
      // On vérifie que la valeur de l'input assurance soit bien de type number
      if(isNaN(tauxAssurance)) {
        // Sinon on remplace la virgule décimale de la valeur par un point décimal
        tauxAssurance = +tauxAssurance.toString().replace(',', '.')
      }
      /*
       * On va calculer les mensualités du prêt selon la formule suivante
       * m = C * (t/12) / 1 - (1+ t/12)^-n
       * C étant le montant du capital emprunté
       * t étant le taux annuel 
       * n étant la durée en mois prévu
       */
      // Calcul du taux périodique de la formule -> t/12
      const tauxPeriodique= (tauxInteret / 100) / 12
      // Calcul du numérateur de la formule -> C * (t/12)
      const capitalAvecTaux = this.montant.value * tauxPeriodique
      // Calcul de la durée en mois de la durée rentrée en année par l'utilisateur
      const dureeMensualite = 12*this.duree.value
      // Calcul du dénominateur de la formule -> 1- (1+(t/12)^-n)
      // Math.pow(base, exposant) sert pour faire l'exposant de la formule -> ^-n 
      const denominateurFormule = 1- Math.pow((1+tauxPeriodique),- dureeMensualite)

      // Utilisation de la formule complète pour obtenir la mensualité
      const mensualiteTauxInteret = capitalAvecTaux / denominateurFormule

      /**
       * On calule le montant de l'assurance via la formule
       * a = ta * c /12
       * ta étant le taux de l'assurance
       * c étant le montant du capital emprunté
       */
      
      this.mensualiteAssurance = (tauxAssurance /100) * this.montant.value /12

      // Calcul de la mensualité globale
      this.mensualiteGlobale = mensualiteTauxInteret + this.mensualiteAssurance

      this.coutCredit = (this.mensualiteGlobale * dureeMensualite) - this.montant.value
    }
    
  }
  /**
   * Getter du formulaire
   */
  get montant () {return this.simulationForm.get('montant')}
  get interet () {return this.simulationForm.get('interet')}
  get assurance () {return this.simulationForm.get('assurance')}
  get duree () {return this.simulationForm.get('duree')}

}
