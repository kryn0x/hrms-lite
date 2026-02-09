# HRMS Lite - Human Resource Management System

A simple and efficient HRMS application for managing employees and attendance tracking.

## Features

- ✅ Employee Registration & Management
- ✅ Attendance Marking & Tracking
- ✅ Attendance History View
- ✅ Email Validation
- ✅ Toast Notifications
- ✅ Responsive Design

## Tech Stack

**Frontend:**
- React.js
- CSS3

**Backend:**
- Django 4.2
- Django REST Framework
- SQLite Database

## Local Development

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend/frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

## Deployment

See [SIMPLE_DEPLOY_GUIDE.md](SIMPLE_DEPLOY_GUIDE.md) for deployment instructions.

## Project Structure

```
├── backend/
│   ├── api/                 # Django app
│   ├── backend/             # Django project settings
│   ├── requirements.txt     # Python dependencies
│   └── build.sh            # Build script
├── frontend/
│   └── frontend/
│       ├── src/            # React source code
│       ├── public/         # Static files
│       └── package.json    # Node dependencies
└── README.md
```

## API Endpoints

- `GET /api/employees/` - Get all employees
- `POST /api/add_employee/` - Add new employee
- `DELETE /api/delete_employee/<id>/` - Delete employee
- `POST /api/attendance/` - Mark attendance
- `GET /api/get_attendance/` - Get all attendance records
- `GET /api/attendance/<id>/` - Get employee attendance history

## License

MIT License
