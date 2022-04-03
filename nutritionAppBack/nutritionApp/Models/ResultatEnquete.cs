using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class ResultatEnquete
    {
        public double? EnergieKcal100G { get; set; }
        public double? EauG100G { get; set; }
        public double? ProteinesG100G { get; set; }
        public double? GlucidesG100G { get; set; }
        public double? LipidesG100G { get; set; }
        public double? FibresAlimentairesG100G { get; set; }
        public double? AlcoolG100G { get; set; }
        public double? AgSaturesG100G { get; set; }
        public double? AgMonoinsaturesG100G { get; set; }
        public double? AgPolyinsaturesG100G { get; set; }
        public double? AgW6G100G { get; set; }
        public double? AgW3G100G { get; set; }
        public double? CholesterolMg100G { get; set; }
        public double? CalciumMg100G { get; set; }
        public double? CuivreMg100G { get; set; }
        public double? FerMg100G { get; set; }
        public double? MagnesiumMg100G { get; set; }
        public double? PhosphoreMg100G { get; set; }
        public double? PotassiumMg100G { get; set; }
        public double? SodiumMg100G { get; set; }
        public double? ZincMg100G { get; set; }
        public double? Retinolmg100G { get; set; }
        public double? VitamineDmg100G { get; set; }
        public double? VitamineEMg100G { get; set; }
        public double? VitamineK1mg100G { get; set; }
        public double? VitamineCMg100G { get; set; }
        public double? VitamineB1Mg100G { get; set; }
        public double? VitamineB2Mg100G { get; set; }
        public double? VitamineB3Mg100G { get; set; }
        public double? VitamineB5Mg100G { get; set; }
        public double? VitamineB6Mg100G { get; set; }
        public double? VitamineB9mg100G { get; set; }
        public double? VitamineB12mg100G { get; set; }
        public long EnqAlimId { get; set; }
        public long EnqAlimIdPatient { get; set; }

        public double? PtDejProtide { get; set; }
        public double? PtDejLipide { get; set; }
        public double? PtDejGluicide { get; set; }
        public double? PtDejCalorie { get; set; }

        public double? DejProtide { get; set; }
        public double? DejLipide { get; set; }
        public double? DejGluicide { get; set; }
        public double? DejCalorie { get; set; }

        public double? DinerProtide { get; set; }
        public double? DinerLipide { get; set; }
        public double? DinerGluicide { get; set; }
        public double? DinerCalorie { get; set; }

        public virtual Patient EnqAlimIdPatientNavigation { get; set; }
    }
}
