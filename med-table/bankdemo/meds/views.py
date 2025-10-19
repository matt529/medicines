from rest_framework import viewsets
from .models import Medicine
from .serializers import MedicineSerializer

class MedicineViewSet(viewsets.ModelViewSet):
    """
    DRF 標準 ViewSet
    支援：
    - GET /api/medicines/       → 列出所有藥品
    - POST /api/medicines/      → 新增藥品
    - GET /api/medicines/{id}/  → 取得單一藥品
    - PATCH /api/medicines/{id}/→ 更新藥品
    - DELETE /api/medicines/{id}/→ 刪除藥品
    """
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from .models import Medicine
# import json

# @csrf_exempt
# def medicine_list(request):
#     """取得所有藥品資料"""
#     medicines = Medicine.objects.all().values("id", "name", "category", "price")
#     return JsonResponse(list(medicines), safe=False)

# @csrf_exempt
# def medicine_save(request):
#     """新增或更新藥品資料"""
#     if request.method == "POST":
#         data = json.loads(request.body)
#         med_id = data.get("id")

#         if med_id:  # 更新
#             med = Medicine.objects.get(id=med_id)
#             med.name = data["name"]
#             med.category = data["category"]
#             med.price = data["price"]
#             med.save()
#         else:  # 新增
#             Medicine.objects.create(
#                 name=data["name"],
#                 category=data["category"],
#                 price=data["price"]
#             )

#         return JsonResponse({"status": "success"})

# @csrf_exempt
# def medicine_delete(request, med_id):
#     """刪除藥品資料 (從資料庫刪除)"""
#     try:
#         medicine = Medicine.objects.get(id=med_id)
#         medicine.delete()
#         return JsonResponse({"status": "deleted"})
#     except Medicine.DoesNotExist:
#         return JsonResponse({"error": "Medicine not found"}, status=404)
