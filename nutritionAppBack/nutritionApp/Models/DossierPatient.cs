using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class DossierPatient
    {
        public long DosPatientId { get; set; }
        public string DosPathologies { get; set; }
        public string DosAntecedentsPersonnels { get; set; }
        public string DosAntecedentsFamiliaux { get; set; }
        public string DosTypeObesite { get; set; }
        public double? DosPoidsMaximal { get; set; }
        public string DosCirconstancePrisePoids { get; set; }
        public string DosRegime { get; set; }
        public string DosPerteRegime { get; set; }
        public string DosCauseArretRegime { get; set; }
        public string DosDiabete { get; set; }
        public string DosTraitementDiabete { get; set; }
        public string DosHistoriqueAmaigrissement { get; set; }
        public string DosPreferencesGustatives { get; set; }
        public string DosAlcool { get; set; }
        public string DosQuantiteAlcool { get; set; }
        public string DosTabac { get; set; }
        public string DosQuantiteTabac { get; set; }
        public string DosLieuxRepas { get; set; }
        public int? DosNombreRepas { get; set; }
        public string DosTypeRepas { get; set; }
        public string DosProblemeMastication { get; set; }
        public string DosQuantiteEau { get; set; }
        public bool? DosSport { get; set; }
        public string DosTypeSport { get; set; }
        public string DosDureeSport { get; set; }
        public string DosFrequenceSport { get; set; }
        public string DosTca { get; set; }
        public int DosId { get; set; }
    }
}
