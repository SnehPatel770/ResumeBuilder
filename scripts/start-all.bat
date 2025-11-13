@echo off
REM ============================================
REM Script Name: start-all.bat
REM Purpose: Start both backend and frontend servers
REM ============================================

echo.
echo ============================================
echo Starting Resume Builder - Full Stack
echo ============================================
echo.

REM Check if virtual environment exists
if not exist "..\venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run setup first: scripts\setup.bat
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "..\frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    echo Please run setup first: scripts\setup.bat
    pause
    exit /b 1
)

echo Starting Backend Server...
start "Django Backend" cmd /k "cd /d %~dp0.. && call venv\Scripts\activate.bat && cd backend && python manage.py runserver"

echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "React Frontend" cmd /k "cd /d %~dp0..\frontend && npm run dev"

echo.
echo ============================================
echo Both servers are starting!
echo ============================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Close the terminal windows to stop the servers
echo.
pause
