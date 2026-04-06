from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Pastikan QualityClaimViewSet sudah dipanggil di sini
from supply_chain.views import CoalPerformanceViewSet, QualityClaimViewSet 

router = DefaultRouter()
router.register(r'performance', CoalPerformanceViewSet)
# Ini baris barunya, Ian! Supaya React bisa akses alamat http://127.0.0.1:8000/api/claims/
router.register(r'claims', QualityClaimViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), # Semua rute di atas akan otomatis masuk ke sini
]