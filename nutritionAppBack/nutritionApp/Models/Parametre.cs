using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class Parametre
    {
        public long ParId { get; set; }
        public int? ParNombreTentatives { get; set; }
        public string ParMotPasseParDefaut { get; set; }
    }
}
