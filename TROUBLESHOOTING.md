# Troubleshooting Google Auth

## Issue: "Google Auth not configured yet!" alert appears

### Solution 1: Restart the Development Server ⭐ MOST LIKELY FIX

React development server needs to be restarted to pick up new environment variables:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart:
cd frontend
npm run dev
```

### Solution 2: Check Environment Variables

Open browser console (F12) and look for these logs:
- `Environment REACT_APP_GOOGLE_CLIENT_ID: [your-client-id]`
- `Initializing Google Auth with Client ID: [your-client-id]`

If you see `undefined` or the old placeholder value, the server needs restarting.

### Solution 3: Verify .env File

Ensure `frontend/.env` contains:
```
REACT_APP_GOOGLE_CLIENT_ID=175026454956-qer1sdfj396apm2jrkneqqijc7p231ft.apps.googleusercontent.com
REACT_APP_API_URL=http://localhost:8000
```

**Important**: No spaces around the `=` sign!

### Solution 4: Clear Browser Cache

Sometimes browsers cache the old JavaScript:
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Solution 5: Check Google Cloud Console

Ensure your Google OAuth client has these authorized origins:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

## Expected Behavior After Fix

1. Click "Continue with Google" button
2. Google's popup should appear (not the alert)
3. Select your Google account
4. Get redirected back to the app
5. See your profile in the header

## Still Having Issues?

Check the browser console for error messages and ensure:
- Frontend server is running on port 3000
- Backend server is running on port 8000
- No firewall blocking the requests