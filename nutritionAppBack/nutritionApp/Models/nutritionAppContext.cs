using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace nutritionApp.Models
{
    public partial class nutritionAppContext : DbContext
    {
        public nutritionAppContext()
        {
        }

        public nutritionAppContext(DbContextOptions<nutritionAppContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aliment> Aliments { get; set; }
        public virtual DbSet<Compo> Compos { get; set; }
        public virtual DbSet<DossierPatient> DossierPatients { get; set; }
        public virtual DbSet<Parametre> Parametres { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<Remarque> Remarques { get; set; }
        public virtual DbSet<Rendezvou> Rendezvous { get; set; }
        public virtual DbSet<ResultatEnquete> ResultatEnquetes { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Utilisateur> Utilisateurs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=T00937\\SQLEXPRESS;Database=nutritionApp;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aliment>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("aliment");

                entity.Property(e => e.AgMonoinsaturesG100G).HasColumnName("AG monoinsaturés (g/100 g)");

                entity.Property(e => e.AgPolyinsaturesG100G).HasColumnName("AG polyinsaturés (g/100 g)");

                entity.Property(e => e.AgSaturesG100G).HasColumnName("AG saturés (g/100 g)");

                entity.Property(e => e.AgW3G100G).HasColumnName("AG W3 (g/100 g)");

                entity.Property(e => e.AgW6G100G).HasColumnName("AG W6 (g/100 g)");

                entity.Property(e => e.AlcoolG100G).HasColumnName("Alcool (g/100 g)");

                entity.Property(e => e.AlimGrpNomFr)
                    .HasMaxLength(255)
                    .HasColumnName("alim_grp_nom_fr");

                entity.Property(e => e.AlimNomFr)
                    .HasMaxLength(255)
                    .HasColumnName("alim_nom_fr");

                entity.Property(e => e.AlimSsgrpNomFr)
                    .HasMaxLength(255)
                    .HasColumnName("alim_ssgrp_nom_fr");

                entity.Property(e => e.CalciumMg100G).HasColumnName("Calcium (mg/100 g)");

                entity.Property(e => e.CholesterolMg100G).HasColumnName("Cholestérol (mg/100 g)");

                entity.Property(e => e.CuivreMg100G).HasColumnName("Cuivre (mg/100 g)");

                entity.Property(e => e.EauG100G).HasColumnName("Eau (g/100 g)");

                entity.Property(e => e.EnergieKcal100G).HasColumnName("Energie, (kcal/100 g)");

                entity.Property(e => e.FerMg100G).HasColumnName("Fer (mg/100 g)");

                entity.Property(e => e.FibresAlimentairesG100G).HasColumnName("Fibres alimentaires (g/100 g)");

                entity.Property(e => e.GlucidesG100G).HasColumnName("Glucides (g/100 g)");

                entity.Property(e => e.LipidesG100G).HasColumnName("Lipides (g/100 g)");

                entity.Property(e => e.MagnesiumMg100G).HasColumnName("Magnésium (mg/100 g)");

                entity.Property(e => e.PhosphoreMg100G).HasColumnName("Phosphore (mg/100 g)");

                entity.Property(e => e.PotassiumMg100G).HasColumnName("Potassium (mg/100 g)");

                entity.Property(e => e.ProteinesG100G).HasColumnName("Protéines (g/100 g)");

                entity.Property(e => e.Retinolmg100G).HasColumnName("Rétinol (µg/100 g)");

                entity.Property(e => e.SodiumMg100G).HasColumnName("Sodium (mg/100 g)");

                entity.Property(e => e.VitamineB12mg100G).HasColumnName("Vitamine B12 (µg/100 g)");

                entity.Property(e => e.VitamineB1Mg100G).HasColumnName("Vitamine B1 (mg/100 g)");

                entity.Property(e => e.VitamineB2Mg100G).HasColumnName("Vitamine B2 (mg/100 g)");

                entity.Property(e => e.VitamineB3Mg100G).HasColumnName("Vitamine B3 (mg/100 g)");

                entity.Property(e => e.VitamineB5Mg100G).HasColumnName("Vitamine B5  (mg/100 g)");

                entity.Property(e => e.VitamineB6Mg100G).HasColumnName("Vitamine B6 (mg/100 g)");

                entity.Property(e => e.VitamineB9mg100G).HasColumnName("Vitamine B9 (µg/100 g)");

                entity.Property(e => e.VitamineCMg100G).HasColumnName("Vitamine C (mg/100 g)");

                entity.Property(e => e.VitamineDmg100G).HasColumnName("Vitamine D (µg/100 g)");

                entity.Property(e => e.VitamineEMg100G).HasColumnName("Vitamine E (mg/100 g)");

                entity.Property(e => e.VitamineK1mg100G).HasColumnName("Vitamine K1 (µg/100 g)");

                entity.Property(e => e.ZincMg100G).HasColumnName("Zinc (mg/100 g)");
            });

            modelBuilder.Entity<Compo>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("compo$");

                entity.Property(e => e.AgMonoinsaturésG100G).HasColumnName("AG monoinsaturés (g/100 g)");

                entity.Property(e => e.AgPolyinsaturésG100G).HasColumnName("AG polyinsaturés (g/100 g)");

                entity.Property(e => e.AgSaturésG100G).HasColumnName("AG saturés (g/100 g)");

                entity.Property(e => e.AgW3G100G).HasColumnName("AG W3 (g/100 g)");

                entity.Property(e => e.AgW6G100G).HasColumnName("AG W6 (g/100 g)");

                entity.Property(e => e.AlcoolG100G).HasColumnName("Alcool (g/100 g)");

                entity.Property(e => e.AlimGrpNomFr)
                    .HasMaxLength(255)
                    .HasColumnName("alim_grp_nom_fr");

                entity.Property(e => e.AlimNomFr)
                    .HasMaxLength(255)
                    .HasColumnName("alim_nom_fr");

                entity.Property(e => e.AlimSsgrpNomFr)
                    .HasMaxLength(255)
                    .HasColumnName("alim_ssgrp_nom_fr");

                entity.Property(e => e.CalciumMg100G).HasColumnName("Calcium (mg/100 g)");

                entity.Property(e => e.CholestérolMg100G).HasColumnName("Cholestérol (mg/100 g)");

                entity.Property(e => e.CuivreMg100G).HasColumnName("Cuivre (mg/100 g)");

                entity.Property(e => e.EauG100G).HasColumnName("Eau (g/100 g)");

                entity.Property(e => e.EnergieKcal100G).HasColumnName("Energie, (kcal/100 g)");

                entity.Property(e => e.FerMg100G).HasColumnName("Fer (mg/100 g)");

                entity.Property(e => e.FibresAlimentairesG100G).HasColumnName("Fibres alimentaires (g/100 g)");

                entity.Property(e => e.GlucidesG100G).HasColumnName("Glucides (g/100 g)");

                entity.Property(e => e.LipidesG100G).HasColumnName("Lipides (g/100 g)");

                entity.Property(e => e.MagnésiumMg100G).HasColumnName("Magnésium (mg/100 g)");

                entity.Property(e => e.PhosphoreMg100G).HasColumnName("Phosphore (mg/100 g)");

                entity.Property(e => e.PotassiumMg100G).HasColumnName("Potassium (mg/100 g)");

                entity.Property(e => e.ProtéinesG100G).HasColumnName("Protéines (g/100 g)");

                entity.Property(e => e.RétinolΜg100G).HasColumnName("Rétinol (µg/100 g)");

                entity.Property(e => e.SodiumMg100G).HasColumnName("Sodium (mg/100 g)");

                entity.Property(e => e.VitamineB12Μg100G).HasColumnName("Vitamine B12 (µg/100 g)");

                entity.Property(e => e.VitamineB1Mg100G).HasColumnName("Vitamine B1 (mg/100 g)");

                entity.Property(e => e.VitamineB2Mg100G).HasColumnName("Vitamine B2 (mg/100 g)");

                entity.Property(e => e.VitamineB3Mg100G).HasColumnName("Vitamine B3 (mg/100 g)");

                entity.Property(e => e.VitamineB5Mg100G).HasColumnName("Vitamine B5  (mg/100 g)");

                entity.Property(e => e.VitamineB6Mg100G).HasColumnName("Vitamine B6 (mg/100 g)");

                entity.Property(e => e.VitamineB9Μg100G).HasColumnName("Vitamine B9 (µg/100 g)");

                entity.Property(e => e.VitamineCMg100G).HasColumnName("Vitamine C (mg/100 g)");

                entity.Property(e => e.VitamineDΜg100G).HasColumnName("Vitamine D (µg/100 g)");

                entity.Property(e => e.VitamineEMg100G).HasColumnName("Vitamine E (mg/100 g)");

                entity.Property(e => e.VitamineK1Μg100G).HasColumnName("Vitamine K1 (µg/100 g)");

                entity.Property(e => e.ZincMg100G).HasColumnName("Zinc (mg/100 g)");
            });

            modelBuilder.Entity<DossierPatient>(entity =>
            {
                entity.HasKey(e => e.DosId)
                    .HasName("PK__dossier___FCEDA971AB5DFED6");

                entity.ToTable("dossier_patient");

                entity.Property(e => e.DosId).HasColumnName("dos_id");

                entity.Property(e => e.DosAlcool)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_alcool");

                entity.Property(e => e.DosAntecedentsFamiliaux)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dos_antecedents_familiaux");

                entity.Property(e => e.DosAntecedentsPersonnels)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dos_antecedents_personnels");

                entity.Property(e => e.DosCauseArretRegime)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dos_cause_arret_regime");

                entity.Property(e => e.DosCirconstancePrisePoids)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("dos_circonstance_prise_poids");

                entity.Property(e => e.DosDiabete)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dos_diabete");

                entity.Property(e => e.DosDureeSport)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_duree_sport");

                entity.Property(e => e.DosFrequenceSport)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_frequence_sport");

                entity.Property(e => e.DosHistoriqueAmaigrissement)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dos_historique_amaigrissement");

                entity.Property(e => e.DosLieuxRepas)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dos_lieux_repas");

                entity.Property(e => e.DosNombreRepas).HasColumnName("dos_nombre_repas");

                entity.Property(e => e.DosPathologies)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dos_pathologies");

                entity.Property(e => e.DosPatientId).HasColumnName("dos_patient_id");

                entity.Property(e => e.DosPerteRegime)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dos_perte_regime");

                entity.Property(e => e.DosPoidsMaximal).HasColumnName("dos_poids_maximal");

                entity.Property(e => e.DosPreferencesGustatives)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dos_preferences_gustatives");

                entity.Property(e => e.DosProblemeMastication)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_probleme_mastication");

                entity.Property(e => e.DosQuantiteAlcool)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("dos_quantite_alcool");

                entity.Property(e => e.DosQuantiteEau)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_quantite_eau");

                entity.Property(e => e.DosQuantiteTabac)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_quantite_tabac");

                entity.Property(e => e.DosRegime)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("dos_regime");

                entity.Property(e => e.DosSport).HasColumnName("dos_sport");

                entity.Property(e => e.DosTabac)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_tabac");

                entity.Property(e => e.DosTca)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dos_TCA");

                entity.Property(e => e.DosTraitementDiabete)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dos_traitement_diabete");

                entity.Property(e => e.DosTypeRepas)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dos_type_repas");

                entity.Property(e => e.DosTypeSport)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("dos_type_sport");
            });

            modelBuilder.Entity<Parametre>(entity =>
            {
                entity.HasKey(e => e.ParId);

                entity.ToTable("parametres");

                entity.Property(e => e.ParId).HasColumnName("par_id");

                entity.Property(e => e.ParMotPasseParDefaut)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("par_mot_passe_par_defaut");

                entity.Property(e => e.ParNombreTentatives).HasColumnName("par_nombre_tentatives");
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.PatId);

                entity.ToTable("patient");

                entity.Property(e => e.PatId).HasColumnName("pat_id");

                entity.Property(e => e.PatAdresse)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("pat_adresse");

                entity.Property(e => e.PatAge).HasColumnName("pat_age");

                entity.Property(e => e.PatEtat).HasColumnName("pat_etat");

                entity.Property(e => e.PatIdMedecin).HasColumnName("pat_id_medecin");

                entity.Property(e => e.PatImc).HasColumnName("pat_imc");

                entity.Property(e => e.PatMail)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("pat_mail");

                entity.Property(e => e.PatMotifConsultation)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("pat_motif_consultation");

                entity.Property(e => e.PatNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("pat_nom");

                entity.Property(e => e.PatNutritionnisteId).HasColumnName("pat_nutritionniste_id");

                entity.Property(e => e.PatPoids).HasColumnName("pat_poids");

                entity.Property(e => e.PatPrenom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("pat_prenom");

                entity.Property(e => e.PatProfession)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("pat_profession");

                entity.Property(e => e.PatSexe)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("pat_sexe");

                entity.Property(e => e.PatSituationFamiliale)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("pat_situation_familiale");

                entity.Property(e => e.PatTaille).HasColumnName("pat_taille");

                entity.Property(e => e.PatTelephone).HasColumnName("pat_telephone");

                entity.Property(e => e.PatToureTaille).HasColumnName("pat_toure_taille");
            });

            modelBuilder.Entity<Remarque>(entity =>
            {
                entity.HasKey(e => e.RemId);

                entity.ToTable("remarque");

                entity.Property(e => e.RemId).HasColumnName("rem_id");

                entity.Property(e => e.RemDateAjout)
                    .HasColumnType("date")
                    .HasColumnName("rem_date_ajout");

                entity.Property(e => e.RemDescription)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("rem_description");

                entity.Property(e => e.RemIdPateint).HasColumnName("rem_idPateint");

                entity.Property(e => e.RemImportanceNiveau).HasColumnName("rem_importance_niveau");
            });

            modelBuilder.Entity<Rendezvou>(entity =>
            {
                entity.HasKey(e => e.RendId);

                entity.ToTable("rendezvous");

                entity.Property(e => e.RendId)
                    .HasColumnName("rend_id");

                entity.Property(e => e.RendDate)
                    .HasColumnType("datetime")
                    .HasColumnName("rend_date");

                entity.Property(e => e.RendMedecinId).HasColumnName("rend_medecin_id");

                entity.Property(e => e.RendPatientId).HasColumnName("rend_patient_id");

                entity.Property(e => e.RendStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("rend_status");
            });

            modelBuilder.Entity<ResultatEnquete>(entity =>
            {
                entity.HasKey(e => e.EnqAlimId);

                entity.ToTable("resultat_enquete");

                entity.Property(e => e.EnqAlimId).HasColumnName("enqAlim_id");

                entity.Property(e => e.AgMonoinsaturesG100G).HasColumnName("AG monoinsaturés (g/100 g)");

                entity.Property(e => e.AgPolyinsaturesG100G).HasColumnName("AG polyinsaturés (g/100 g)");

                entity.Property(e => e.AgSaturesG100G).HasColumnName("AG saturés (g/100 g)");

                entity.Property(e => e.AgW3G100G).HasColumnName("AG W3 (g/100 g)");

                entity.Property(e => e.AgW6G100G).HasColumnName("AG W6 (g/100 g)");

                entity.Property(e => e.AlcoolG100G).HasColumnName("Alcool (g/100 g)");

                entity.Property(e => e.CalciumMg100G).HasColumnName("Calcium (mg/100 g)");

                entity.Property(e => e.CholesterolMg100G).HasColumnName("Cholestérol (mg/100 g)");

                entity.Property(e => e.CuivreMg100G).HasColumnName("Cuivre (mg/100 g)");

                entity.Property(e => e.EauG100G).HasColumnName("Eau (g/100 g)");

                entity.Property(e => e.EnergieKcal100G).HasColumnName("Energie, (kcal/100 g)");

                entity.Property(e => e.EnqAlimIdPatient).HasColumnName("enqAlim_id_patient");

                entity.Property(e => e.FerMg100G).HasColumnName("Fer (mg/100 g)");

                entity.Property(e => e.FibresAlimentairesG100G).HasColumnName("Fibres alimentaires (g/100 g)");

                entity.Property(e => e.GlucidesG100G).HasColumnName("Glucides (g/100 g)");

                entity.Property(e => e.LipidesG100G).HasColumnName("Lipides (g/100 g)");

                entity.Property(e => e.MagnesiumMg100G).HasColumnName("Magnésium (mg/100 g)");

                entity.Property(e => e.PhosphoreMg100G).HasColumnName("Phosphore (mg/100 g)");

                entity.Property(e => e.PotassiumMg100G).HasColumnName("Potassium (mg/100 g)");

                entity.Property(e => e.ProteinesG100G).HasColumnName("Protéines (g/100 g)");

                entity.Property(e => e.Retinolmg100G).HasColumnName("Rétinol (µg/100 g)");

                entity.Property(e => e.SodiumMg100G).HasColumnName("Sodium (mg/100 g)");

                entity.Property(e => e.VitamineB12mg100G).HasColumnName("Vitamine B12 (µg/100 g)");

                entity.Property(e => e.VitamineB1Mg100G).HasColumnName("Vitamine B1 (mg/100 g)");

                entity.Property(e => e.VitamineB2Mg100G).HasColumnName("Vitamine B2 (mg/100 g)");

                entity.Property(e => e.VitamineB3Mg100G).HasColumnName("Vitamine B3 (mg/100 g)");

                entity.Property(e => e.VitamineB5Mg100G).HasColumnName("Vitamine B5  (mg/100 g)");

                entity.Property(e => e.VitamineB6Mg100G).HasColumnName("Vitamine B6 (mg/100 g)");

                entity.Property(e => e.VitamineB9mg100G).HasColumnName("Vitamine B9 (µg/100 g)");

                entity.Property(e => e.VitamineCMg100G).HasColumnName("Vitamine C (mg/100 g)");

                entity.Property(e => e.VitamineDmg100G).HasColumnName("Vitamine D (µg/100 g)");

                entity.Property(e => e.VitamineEMg100G).HasColumnName("Vitamine E (mg/100 g)");

                entity.Property(e => e.VitamineK1mg100G).HasColumnName("Vitamine K1 (µg/100 g)");

                /**/
                entity.Property(e => e.PtDejProtide).HasColumnName("ptDejProtide");
                entity.Property(e => e.PtDejLipide).HasColumnName("ptDejLipide");
                entity.Property(e => e.PtDejGluicide).HasColumnName("ptDejGluicide");
                entity.Property(e => e.PtDejCalorie).HasColumnName("ptDejCalorie");
                entity.Property(e => e.DejProtide).HasColumnName("dejProtide");
                entity.Property(e => e.DejLipide).HasColumnName("dejLipide");
                entity.Property(e => e.DejGluicide).HasColumnName("dejGluicide");
                entity.Property(e => e.DejCalorie).HasColumnName("dejCalorie");
                entity.Property(e => e.DinerProtide).HasColumnName("dinerProtide");
                entity.Property(e => e.DinerLipide).HasColumnName("dinerLipide");
                entity.Property(e => e.DinerGluicide).HasColumnName("dinerGluicide");
                entity.Property(e => e.DinerCalorie).HasColumnName("dinerCalorie");

                entity.Property(e => e.ZincMg100G).HasColumnName("Zinc (mg/100 g)");

                entity.HasOne(d => d.EnqAlimIdPatientNavigation)
                    .WithMany(p => p.ResultatEnquetes)
                    .HasForeignKey(d => d.EnqAlimIdPatient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_resultat_enquete_patient");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.RolId)
                    .HasName("pk_role");

                entity.ToTable("role");

                entity.Property(e => e.RolId).HasColumnName("rol_id");

                entity.Property(e => e.RolDescription)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("rol_description");

                entity.Property(e => e.RolEtat).HasColumnName("rol_etat");

                entity.Property(e => e.RolLibelle)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("rol_libelle");
            });

            modelBuilder.Entity<Utilisateur>(entity =>
            {
                entity.HasKey(e => e.UtiId);

                entity.ToTable("utilisateur");

                entity.Property(e => e.UtiId).HasColumnName("uti_id");

                entity.Property(e => e.UtiDateCreation)
                    .HasColumnType("datetime")
                    .HasColumnName("uti_date_creation");

                entity.Property(e => e.UtiEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("uti_email");

                entity.Property(e => e.UtiEtat).HasColumnName("uti_etat");

                entity.Property(e => e.UtiLogin)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("uti_login");

                entity.Property(e => e.UtiMotPasse)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("uti_mot_passe");

                entity.Property(e => e.UtiNom)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("uti_nom");

                entity.Property(e => e.UtiRole).HasColumnName("uti_role");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
