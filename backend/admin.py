from django.contrib import admin
from .models import SystemUser, User


admin.site.register(SystemUser)
admin.site.register(User)
