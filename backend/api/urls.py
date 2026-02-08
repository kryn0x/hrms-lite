from django.urls import path
from . import views

urlpatterns = [
    path("employees/", views.get_employees),
    path("add_employee/", views.add_employee),

    path("attendance/", views.add_attendance),   # POST
    path("get_attendance/", views.get_attendance),  # GET

    path("delete_employee/<int:id>/", views.delete_employee),
    path("attendance/<int:id>/", views.employee_attendance),

]
