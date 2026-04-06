from rest_framework import serializers
from .models import CoalPerformance, QualityClaim

class QualityClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityClaim
        fields = '__all__'

class CoalPerformanceSerializer(serializers.ModelSerializer):
    # Menampilkan daftar klaim di dalam data performance bulanan
    claims = QualityClaimSerializer(many=True, read_only=True)
    pof_opportunity_loss = serializers.ReadOnlyField()

    class Meta:
        model = CoalPerformance
        fields = '__all__'