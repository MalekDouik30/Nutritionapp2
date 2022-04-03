using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class Utilisateur
    {
        public long UtiId { get; set; }
        public DateTime? UtiDateCreation { get; set; }
        public long? UtiRole { get; set; }
        public bool? UtiEtat { get; set; }
        public string UtiNom { get; set; }
        public string UtiEmail { get; set; }
        public string UtiLogin { get; set; }
        public string UtiMotPasse { get; set; }
    }
}
