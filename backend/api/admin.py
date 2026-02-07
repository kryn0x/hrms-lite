from django.contrib import admin
from .models import Employee

admin.site.register(Employee)

from .models import Attendance
admin.site.register(Attendance)
