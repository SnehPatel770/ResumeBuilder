@echo off
REM ============================================
REM Script Name: start-backend.bat
REM Purpose: Start Django development server
REM ============================================

echo.
echo ============================================
echo Starting Django Backend Server
echo ============================================
echo.

REM Check if virtual environment exists
if not exist "..\venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo.
    echo Please run setup first:
    echo   scripts\setup.bat
    echo.
    pause
    exit /b 1
)

echo Activating virtual environment...
call ..\venv\Scripts\activate.bat
echo.

echo Starting Django server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
cd backend
python manage.py runserver
cd ..
