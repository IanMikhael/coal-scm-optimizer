from django.core.management.base import BaseCommand
from decimal import Decimal

class Command(BaseCommand):
    help = 'Reset dan Input Data Sesuai Tabel 1 Jurnal PT.XYZ (Fixed Circular Import)'

    def handle(self, *args, **kwargs):
        # --- SOLUSI CIRCULAR IMPORT: Import di dalam fungsi handle ---
        from supply_chain.models import CoalPerformance, QualityClaim

        # 1. RESET DATABASE (MENGHAPUS DATA LAMA)
        self.stdout.write(self.style.WARNING("Sedang meriset database..."))
        QualityClaim.objects.all().delete()
        CoalPerformance.objects.all().delete()

        # 2. DATA DARI TABEL 1 JURNAL (REALISASI VS RKAP)
        # Angka di bawah ini 100% akurat sesuai screenshot jurnal kamu
        jurnal_data = [
            {"month": "Januari",  "real": 246242, "rkap": 650400, "pof": 98.0},
            {"month": "Februari", "real": 188583, "rkap": 660400, "pof": 98.2},
            {"month": "Maret",    "real": 201335, "rkap": 670400, "pof": 97.8},
            {"month": "April",    "real": 181844, "rkap": 680400, "pof": 98.5},
            {"month": "Mei",      "real": 191733, "rkap": 690400, "pof": 98.0},
            {"month": "Juni",     "real": 187854, "rkap": 690400, "pof": 98.1},
            {"month": "Juli",     "real": 249773, "rkap": 690400, "pof": 98.3},
        ]

        self.stdout.write(self.style.SUCCESS("Memasukkan data asli Jurnal ke sistem..."))

        for item in jurnal_data:
            # Karena pof_opportunity_loss adalah @property, kita TIDAK mengisinya di sini.
            # Sistem akan menghitung otomatis berdasarkan pof_rate, total_income, dan gross_profit_rate.
            performance_obj = CoalPerformance.objects.create(
                month=item["month"],
                realization=Decimal(item["real"]),
                rkap_target=Decimal(item["rkap"]),
                total_income=Decimal("38490000000000.00"), # Rp 38.49 Triliun (Tabel 4 Jurnal)
                gross_profit_rate=0.4, # 40% (Tabel 4 Jurnal)
                pof_rate=item["pof"], # Nilai POF Aktual
                target_pof=99.0,      # Target Superior (Tabel 3 Jurnal)
                ofct_days=104,        # Temuan Jurnal: 104 Hari
                target_ofct=97,       # Target Jurnal: 97 Hari
                cogs_rate=40.0,       # Temuan Jurnal: 40%
                is_synced_simbara=False
            )

            # 3. INPUT SAMPLE KLAIM (MODUL RETURN)
            # Menjawab tantangan utama jurnal di dimensi "Return"
            if item["month"] == "Januari":
                QualityClaim.objects.create(
                    performance=performance_obj,
                    customer="PLTU Jawa 7",
                    issue="Kadar Kalori rendah (4500 kcal), target sesuai kontrak 5000 kcal.",
                    claim_type="Quality",
                    status="Pending"
                )
            
            if item["month"] == "Maret":
                QualityClaim.objects.create(
                    performance=performance_obj,
                    customer="PT Semen Baturaja",
                    issue="Kuantitas tidak sesuai manifest (Selisih 50 Ton).",
                    claim_type="Quantity",
                    status="Resolved"
                )

        self.stdout.write(self.style.SUCCESS("--- SYNC DATA SELESAI ---"))
        self.stdout.write(self.style.SUCCESS("Sekarang Dashboard Ian sudah Valid 100% sesuai Jurnal!"))