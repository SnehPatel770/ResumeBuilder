@echo off
REM ============================================
REM Script Name: setup.bat
REM Purpose: Complete project setup - install dependencies and run migrations
REM ============================================

echo.
echo ============================================
echo Resume Builder - Project Setup
echo ============================================
echo.

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo.
    echo Please create a virtual environment first:
    echo   python -m venv venv
    echo.
    pause
    exit /b 1
)

echo [1/4] Activating virtual environment...
call venv\Scripts\activate.bat
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)
echo Virtual environment activated successfully!
echo.

echo [2/4] Installing backend dependencies...
cd backend
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install backend dependencies
    echo SOLUTION: Check your internet connection and requirements.txt file
    cd ..
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
cd ..
echo.

echo [3/4] Installing frontend dependencies...
cd frontend
call npm i -f
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install frontend dependencies
    echo SOLUTION: Check your internet connection and ensure Node.js is installed
    cd ..
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
cd ..
echo.

echo [4/4] Running database migrations...
cd backend
python manage.py makemigrations
python manage.py migrate
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Database migration failed
    echo SOLUTION: Check your models for errors
    cd ..
    pause
    exit /b 1
)
echo Database migrations completed successfully!
cd ..
echo.

echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo Next steps:
echo   1. Create a superuser: scripts\create-superuser.bat
echo   2. Start the backend: scripts\start-backend.bat
echo   3. Start the frontend: scripts\start-frontend.bat
echo   4. Or start both: scripts\start-all.bat
echo.
pause
