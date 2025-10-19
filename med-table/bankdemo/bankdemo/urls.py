
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # 新增
    path('api/', include('meds.urls')),  # 將 meds app 的路由加入
]
