from rest_framework import serializers
from .models import Medicine

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'



# Note
# 序列化器 (Serializer)
# 將 Model 物件轉成 JSON 或從 JSON 轉回 Model 的工具。