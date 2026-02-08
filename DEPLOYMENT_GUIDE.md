# HRMS Lite - Deployment Guide

## Option 1: Deploy on Render (Recommended - Free & Easy)

### Backend Deployment (Django)

1. **Create requirements.txt**
   ```
   Django==4.2.0
   djangorestframework==3.14.0
   django-cors-headers==4.0.0
   gunicorn==21.2.0
   whitenoise==6.5.0
   ```

2. **Create Render account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

4. **Deploy Backend on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - Name: hrms-backend
     - Root Directory: backend
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `gunicorn backend.wsgi:application`
   - Click "Create Web Service"
   - Copy the backend URL (e.g., https://hrms-backend.onrender.com)

### Frontend Deployment (React)

1. **Update API URL in frontend**
   - Open `frontend/frontend/src/App.js`
   - Change: `const API = "http://127.0.0.1:8000/api";`
   - To: `const API = "https://YOUR-BACKEND-URL.onrender.com/api";`

2. **Deploy Frontend on Render**
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Settings:
     - Name: hrms-frontend
     - Root Directory: frontend/frontend
     - Build Command: `npm install && npm run build`
     - Publish Directory: build
   - Click "Create Static Site"

---

## Option 2: Deploy on Vercel (Frontend) + Render (Backend)

### Backend on Render (Same as above)

### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Update API URL** (same as above)

3. **Deploy**
   ```bash
   cd frontend/frontend
   vercel
   ```
   - Follow prompts
   - Select project settings
   - Deploy!

---

## Option 3: Deploy on PythonAnywhere (All-in-One)

### For Both Backend & Frontend

1. **Create account**: https://www.pythonanywhere.com
2. **Upload code** via Files tab
3. **Setup virtual environment**
4. **Configure WSGI**
5. **Serve React build** as static files

---

## Important: Update Django Settings

Before deployment, update `backend/backend/settings.py`:

```python
# Add your deployed frontend URL
ALLOWED_HOSTS = ['your-backend-url.onrender.com', 'localhost']

# Update CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-url.onrender.com",
    "http://localhost:3000",
]

# For production
DEBUG = False

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

---

## Quick Commands Reference

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend/frontend
npm install
npm start
```

### Build Frontend for Production
```bash
cd frontend/frontend
npm run build
```

---

## Recommended: Render (Easiest & Free)

**Why Render?**
- Free tier available
- Auto-deploys from GitHub
- Easy setup
- Good for Django + React
- SSL certificate included

**Estimated Time**: 15-20 minutes

---

## Need Help?
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- PythonAnywhere: https://help.pythonanywhere.com
