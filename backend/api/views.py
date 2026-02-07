from django.http import JsonResponse
from .models import Employee, Attendance
from .models import Employee
import json
from django.views.decorators.csrf import csrf_exempt

# get all employees
def get_employees(request):
    employees = list(Employee.objects.values())
    return JsonResponse(employees, safe=False)

# add employee
@csrf_exempt
def add_employee(request):
    if request.method == "POST":
        data = json.loads(request.body)

        Employee.objects.create(
            emp_id=data["emp_id"],
            name=data["name"],
            email=data["email"],
            department=data["department"]
        )
        return JsonResponse({"msg": "Employee added"})

# add attendance
@csrf_exempt
def add_attendance(request):
    if request.method == "POST":
        data = json.loads(request.body)
        emp = Employee.objects.get(id=data["emp_id"])

        Attendance.objects.create(
            emp=emp,
            date=data["date"],
            status=data["status"]
        )
        return JsonResponse({"msg": "Attendance added"})


# get attendance
def get_attendance(request):
    data = []
    for a in Attendance.objects.all():
        data.append({
            "name": a.emp.name,
            "date": a.date,
            "status": a.status
        })
    return JsonResponse(data, safe=False)
