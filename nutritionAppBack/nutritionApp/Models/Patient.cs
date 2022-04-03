using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class Patient
    {
        public Patient()
        {
            ResultatEnquetes = new HashSet<ResultatEnquete>();
        }

        public long PatId { get; set; }
        public string PatNom { get; set; }
        public string PatPrenom { get; set; }
        public int? PatAge { get; set; }
        public string PatProfession { get; set; }
        public int? PatTelephone { get; set; }
        public string PatSituationFamiliale { get; set; }
        public string PatAdresse { get; set; }
        public string PatSexe { get; set; }
        public long? PatNutritionnisteId { get; set; }
        public bool? PatEtat { get; set; }
        public string PatMail { get; set; }
        public long? PatIdMedecin { get; set; }
        public double? PatPoids { get; set; }
        public double? PatTaille { get; set; }
        public double? PatToureTaille { get; set; }
        public double? PatImc { get; set; }
        public string PatMotifConsultation { get; set; }

        public virtual ICollection<ResultatEnquete> ResultatEnquetes { get; set; }
    }
}
