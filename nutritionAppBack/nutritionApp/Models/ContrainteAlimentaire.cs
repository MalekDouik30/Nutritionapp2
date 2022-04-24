namespace nutritionApp.Models
{
    public class ContrainteAlimentaire
    {
        public long Con_id { get; set; }
        public string? Con_nutriment { get; set; }
        public double? Con_homme_inf { get; set; }
        public double? Con_femme_inf { get; set; }
        public double? Con_homme_sup { get; set; }
        public double? Con_femme_sup { get; set; }

    }
}
