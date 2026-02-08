# 🚀 Quick Deployment Steps (Render - Easiest)

## Step 1: Prepare Code

1. **Update Django settings for SQLite** (easier for free deployment)
   - Backend already uses PostgreSQL locally
   - For deployment, we'll use SQLite (no database setup needed)

2. **Files already created:**
   - ✅ `requirements.txt` - Python dependencies
   - ✅ `.gitignore` - Files to ignore
   - ✅ `settings_production.py` - Production settings

## Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "HRMS Lite - Ready for deployment"

# Create repository on GitHub (go to github.com)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend on Render

1. Go to https://render.com and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in:
   - **Name**: `hrms-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn backend.wsgi:application`
5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment
7. **Copy your backend URL** (e.g., `https://hrms-backend-xyz.onrender.com`)

## Step 4: Update Frontend API URL

1. Open `frontend/frontend/src/App.js`
2. Find line: `const API = "http://127.0.0.1:8000/api";`
3. Replace with: `const API = "https://YOUR-BACKEND-URL.onrender.com/api";`
4. Save and commit:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

## Step 5: Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Fill in:
   - **Name**: `hrms-frontend`
   - **Root Directory**: `frontend/frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Click **"Create Static Site"**
5. Wait 5-10 minutes

## Step 6: Update Backend CORS Settings

1. Go to your backend service on Render
2. Click **"Environment"** tab
3. Add environment variable:
   - Key: `FRONTEND_URL`
   - Value: Your frontend URL (e.g., `https://hrms-frontend-xyz.onrender.com`)
4. Or manually update `settings.py` with your frontend URL in `CORS_ALLOWED_ORIGINS`

## ✅ Done!

Your app is now live! 

- **Frontend**: `https://hrms-frontend-xyz.onrender.com`
- **Backend**: `https://hrms-backend-xyz.onrender.com`

---

## ⚠️ Important Notes

1. **Free tier limitations:**
   - Backend sleeps after 15 min of inactivity
   - First request after sleep takes 30-60 seconds
   - 750 hours/month free

2. **Database:**
   - Using SQLite (file-based)
   - Data persists on Render's disk
   - For production, consider PostgreSQL

3. **First time setup:**
   - Create superuser: Go to Render dashboard → Shell → `python manage.py createsuperuser`

---

## 🆘 Troubleshooting

**Backend not working?**
- Check logs in Render dashboard
- Verify `requirements.txt` is correct
- Check `ALLOWED_HOSTS` in settings

**Frontend not connecting?**
- Verify API URL in `App.js`
- Check CORS settings in backend
- Check browser console for errors

**Database errors?**
- Run migrations: `python manage.py migrate`
- Check database settings

---

## 💡 Alternative: Vercel (Frontend only)

If you prefer Vercel for frontend:

```bash
cd frontend/frontend
npm install -g vercel
vercel
```

Follow prompts and deploy!

---

## 📞 Need Help?

- Render Support: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/4.2/howto/deployment/
- React Deployment: https://create-react-app.dev/docs/deployment/
