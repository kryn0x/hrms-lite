# 🚀 Push Changes & Redeploy

## Current Issue:
Settings file is correct locally, but Render is running old code.

## ✅ Solution - Push Changes:

### Step 1: Check Git Status
```bash
git status
```

### Step 2: Add All Changes
```bash
git add .
```

### Step 3: Commit
```bash
git commit -m "Fix ALLOWED_HOSTS for Render deployment"
```

### Step 4: Push to GitHub
```bash
git push origin main
```

### Step 5: Trigger Render Redeploy

**Option A: Auto Deploy (if enabled)**
- Render will automatically detect the push
- Wait 2-3 minutes for redeploy

**Option B: Manual Deploy**
1. Go to Render Dashboard
2. Click on your "HRMS-System" service
3. Click "Manual Deploy" button (top right)
4. Select "Deploy latest commit"
5. Wait for deployment to complete

---

## 🔍 Verify Deployment:

### Check Render Logs:
1. Go to your service on Render
2. Click "Logs" tab
3. Look for:
   ```
   Starting gunicorn...
   Listening at: http://0.0.0.0:10000
   ```

### Test the API:
Once deployed, visit:
```
https://hrms-system-1clm.onrender.com/api/employees/
```

Should return: `[]`

---

## ⚠️ If Still Shows DisallowedHost:

### Quick Fix - Add Wildcard Temporarily:

Update `settings.py`:
```python
ALLOWED_HOSTS = ['*']  # Allows all hosts
```

Then:
```bash
git add .
git commit -m "Allow all hosts temporarily"
git push origin main
```

This will definitely work, then you can restrict it later.

---

## 🎯 Alternative: Use Environment Variable

In Render Dashboard:
1. Go to your service
2. Click "Environment" tab
3. Add variable:
   - Key: `ALLOWED_HOSTS`
   - Value: `hrms-system-1clm.onrender.com`
4. Save and redeploy

Then update `settings.py`:
```python
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')
```

---

## ✅ After It Works:

Test these endpoints:
- `/api/employees/` - Should return `[]`
- `/api/get_attendance/` - Should return `[]`
- `/admin/` - Should show admin login

Then proceed to frontend deployment!
