from django.contrib import admin
from .models import CoalPerformance, QualityClaim

# Agar kita bisa isi klaim langsung di dalam halaman Performance
class QualityClaimInline(admin.TabularInline):
    model = QualityClaim
    extra = 1 # Memberikan 1 baris kosong otomatis untuk input

@admin.register(CoalPerformance)
class CoalPerformanceAdmin(admin.ModelAdmin):
    list_display = ('month', 'rkap_target', 'realization', 'gap_tonnage', 'is_synced_simbara')
    inlines = [QualityClaimInline] # Menghubungkan modul Return ke performa bulanan

@admin.register(QualityClaim)
class QualityClaimAdmin(admin.ModelAdmin):
    list_display = ('customer', 'performance', 'claim_type', 'status')
    list_filter = ('status', 'claim_type')