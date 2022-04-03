using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class Remarque
    {
        public long RemId { get; set; }
        public DateTime RemDateAjout { get; set; }
        public string RemDescription { get; set; }
        public long RemIdPateint { get; set; }
        public int RemImportanceNiveau { get; set; }
    }
}
