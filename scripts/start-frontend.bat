@echo off
REM ============================================
REM Script Name: start-frontend.bat
REM Purpose: Start React development server
REM ============================================

echo.
echo ============================================
echo Starting React Frontend Server
echo ============================================
echo.

REM Check if node_modules exists
if not exist "..\frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    echo.
    echo Please run setup first:
    echo   scripts\setup.bat
    echo.
    pause
    exit /b 1
)

echo Starting React server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
cd ..\frontend
call npm run dev
cd ..
