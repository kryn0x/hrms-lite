# 🔧 Fix Database Connection Error

## Error: Connection to localhost:5432 failed

**Cause:** Render might have cached old code or environment variable is set.

---

## ✅ Solution 1: Clear Render Cache & Redeploy

### Step 1: Push Latest Code
```bash
git add .
git commit -m "Force SQLite database config"
git push origin main
```

### Step 2: Clear Build Cache on Render
1. Go to Render Dashboard
2. Click on "HRMS-System" service
3. Click "Settings" tab (left sidebar)
4. Scroll down to "Build & Deploy"
5. Click **"Clear build cache"**
6. Then click **"Manual Deploy"** → "Deploy latest commit"

---

## ✅ Solution 2: Check Environment Variables

1. Go to Render Dashboard → Your Service
2. Click "Environment" tab
3. **Check if `DATABASE_URL` exists**
4. If it exists, **DELETE IT**
5. Save and redeploy

---

## ✅ Solution 3: Force SQLite in Code

Add this at the top of `settings.py` (after imports):

```python
# Force SQLite - ignore any DATABASE_URL
import os
if 'DATABASE_URL' in os.environ:
    del os.environ['DATABASE_URL']
```

Then push:
```bash
git add .
git commit -m "Force remove DATABASE_URL"
git push origin main
```

---

## ✅ Solution 4: Simplify Build Command

In Render Dashboard:

**Change Build Command to:**
```
pip install -r requirements.txt && python manage.py migrate --run-syncdb
```

**Start Command:**
```
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
```

---

## 🎯 Quick Test After Deploy:

Visit: `https://hrms-system-1clm.onrender.com/api/employees/`

Should return: `[]`

---

## ⚠️ If Still Fails:

### Check Render Logs for:
- "Using database: sqlite3" ✅
- "Using database: postgresql" ❌

### Last Resort - Recreate Service:
1. Delete current service on Render
2. Create new Web Service
3. Use these exact settings:
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt && python manage.py migrate`
   - Start: `gunicorn backend.wsgi:application`
   - No environment variables

---

## 📝 What to Do Now:

1. **Try Solution 1 first** (Clear cache)
2. If fails, **try Solution 2** (Check env vars)
3. If still fails, **try Solution 3** (Force SQLite in code)

Let me know which one works!
