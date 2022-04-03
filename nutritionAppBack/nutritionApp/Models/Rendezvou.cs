using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class Rendezvou
    {
        public long RendId { get; set; }
        public long RendPatientId { get; set; }
        public long RendMedecinId { get; set; }
        public DateTime RendDate { get; set; }
        public string RendStatus { get; set; }
    }
}
