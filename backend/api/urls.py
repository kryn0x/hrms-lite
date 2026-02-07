from django.urls import path
from . import views

urlpatterns = [
    path("employees/", views.get_employees),
    path("add_employee/", views.add_employee),

    # attendance urls
    path("add_attendance/", views.add_attendance),
    path("attendance/", views.get_attendance),
]
