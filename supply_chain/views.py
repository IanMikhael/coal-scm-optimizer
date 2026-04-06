from rest_framework import viewsets
# Pastikan kedua model ini di-import
from .models import CoalPerformance, QualityClaim 
# Pastikan kedua serializer ini di-import
from .serializers import CoalPerformanceSerializer, QualityClaimSerializer 

class CoalPerformanceViewSet(viewsets.ModelViewSet):
    queryset = CoalPerformance.objects.all().order_by('id')
    serializer_class = CoalPerformanceSerializer

class QualityClaimViewSet(viewsets.ModelViewSet):
    # Sekarang Python sudah kenal siapa QualityClaim
    queryset = QualityClaim.objects.all().order_by('-id') # Pakai -id biar klaim terbaru di atas
    serializer_class = QualityClaimSerializer