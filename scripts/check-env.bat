@echo off
REM ============================================
REM Script Name: check-env.bat
REM Purpose: Check environment and dependencies
REM ============================================

echo.
echo ============================================
echo Environment Check
echo ============================================
echo.

echo [1/7] Checking Python...
python --version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] Python not found
    echo Install from: https://www.python.org/downloads/
) else (
    echo [OK] Python installed
)
echo.

echo [2/7] Checking Node.js...
node --version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] Node.js not found
    echo Install from: https://nodejs.org/
) else (
    echo [OK] Node.js installed
)
echo.

echo [3/7] Checking npm...
npm --version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FAIL] npm not found
) else (
    echo [OK] npm installed
)
echo.

echo [4/7] Checking virtual environment...
if exist "..\venv\Scripts\activate.bat" (
    echo [OK] Virtual environment exists
) else (
    echo [FAIL] Virtual environment not found
    echo Create with: python -m venv venv
)
echo.

echo [5/7] Checking backend dependencies...
if exist "..\backend\db.sqlite3" (
    echo [OK] Database exists
) else (
    echo [WARN] Database not found - run migrations
)
echo.

echo [6/7] Checking frontend dependencies...
if exist "..\frontend\node_modules" (
    echo [OK] node_modules exists
) else (
    echo [FAIL] node_modules not found
    echo Run: scripts\install-frontend.bat
)
echo.

echo [7/7] Checking environment files...
if exist "..\frontend\.env" (
    echo [OK] Frontend .env exists
) else (
    echo [WARN] Frontend .env not found
    echo Copy from .env.example and configure
)
echo.

echo ============================================
echo Environment Check Complete
echo ============================================
echo.
pause
