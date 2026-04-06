from django.db import models

class CoalPerformance(models.Model):
    month = models.CharField(max_length=20)
    # Data RKAP vs Realisasi
    rkap_target = models.DecimalField(max_digits=15, decimal_places=2) 
    realization = models.DecimalField(max_digits=15, decimal_places=2)
    
    # Financial for Opportunity Cost
    total_income = models.DecimalField(max_digits=20, decimal_places=2, default=38490000000000)
    gross_profit_rate = models.FloatField(default=0.4) # 40%
    
    # SCOR Metrics
    pof_rate = models.FloatField() # Actual 98%
    target_pof = models.FloatField(default=99.0) # Target Superior
    ofct_days = models.IntegerField() # Actual 104 Days
    target_ofct = models.IntegerField(default=97) # Target
    cogs_rate = models.FloatField() # Actual 40%
    
    # Compliance 2026
    simbara_id = models.CharField(max_length=100, blank=True)
    is_synced_simbara = models.BooleanField(default=False)

    @property
    def gap_tonnage(self):
        # Selisih RKAP vs Realisasi yang dibahas di Tabel 1 Jurnal
        return self.rkap_target - self.realization 

    @property
    def pof_opportunity_loss(self):
        # Formula Opportunity Loss: (Total Income x Gap POF) x Gross Profit %
        # Digunakan untuk menghitung Rp 153 Miliar yang muncul di dashboard kamu
        gap_percentage = (self.target_pof - self.pof_rate) / 100
        if gap_percentage > 0:
            return float(self.total_income) * gap_percentage * self.gross_profit_rate
        return 0

    @property
    def rkab_alert(self):
        # Memberikan sinyal merah di React jika produksi di bawah target
        return self.realization < self.rkap_target

class QualityClaim(models.Model):
    # Modul Return (Tantangan Utama PT.XYZ)
    performance = models.ForeignKey(CoalPerformance, on_delete=models.CASCADE, related_name='claims')
    customer = models.CharField(max_length=100, null=True, blank=True) 
    
    # Menambahkan kembali claim_type agar admin.py tidak error
    claim_type = models.CharField(
        max_length=50, 
        choices=[('Quality', 'Kualitas'), ('Quantity', 'Kuantitas')],
        default='Quality'
    )
    
    issue = models.TextField(null=True, blank=True) 
    # Pastikan upload_to='claims/' agar file lab tersimpan rapi
    evidence_file = models.FileField(upload_to='claims/', null=True, blank=True) 
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Claim {self.customer} - {self.claim_type}"