from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import UserViewSet


router = DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('admin', admin.site.urls),
    url(r'^api/', include(router.urls)),
]
