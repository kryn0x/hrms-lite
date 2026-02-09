from django.http import JsonResponse
from .models import Employee, Attendance
import json
import re
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

        emp_id = data.get("emp_id")
        name = data.get("name")
        email = data.get("email")
        department = data.get("department")

        #  required field validation
        if not emp_id or not name or not email or not department:
            return JsonResponse({"error": "All fields are required"}, status=400)
        
        # email format validation
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, email):
            return JsonResponse({"error": "Invalid email format"}, status=400)

        #  duplicate employee check
        if Employee.objects.filter(emp_id=emp_id).exists():
            return JsonResponse({"error": "Employee ID already exists"}, status=400)

        # save employee
        Employee.objects.create(
            emp_id=emp_id,
            name=name,
            email=email,
            department=department
        )

        return JsonResponse({"msg": "Employee added"}, status=201)


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

@csrf_exempt
def delete_employee(request, id):
    if request.method == "DELETE":
        try:
            emp = Employee.objects.get(id=id)
            emp.delete()
            return JsonResponse({"msg": "Employee deleted"})
        except:
            return JsonResponse({"error": "Employee not found"})
        
@csrf_exempt
def employee_attendance(request, id):
    data = []
    records = Attendance.objects.filter(emp_id=id)

    for a in records:
        data.append({
            "date": a.date,
            "status": a.status
        })

    return JsonResponse(data, safe=False)
