using System;
using System.Collections.Generic;

#nullable disable

namespace nutritionApp.Models
{
    public partial class Role
    {
        public bool? RolEtat { get; set; }
        public long RolId { get; set; }
        public string RolLibelle { get; set; }
        public string RolDescription { get; set; }
    }
}
