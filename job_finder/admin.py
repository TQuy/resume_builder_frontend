from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from job_finder.models import Resume
from .models import User

admin.site.register(User, UserAdmin)
admin.site.register(Resume)
