@echo off
REM ============================================
REM Script Name: test-frontend.bat
REM Purpose: Run React tests
REM ============================================

echo.
echo ============================================
echo Running Frontend Tests
echo ============================================
echo.

REM Check if node_modules exists
if not exist "..\frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    pause
    exit /b 1
)

echo Running React tests...
cd ..\frontend
call npm test -- --watchAll=false
cd ..

echo.
echo ============================================
echo Tests completed!
echo ============================================
echo.
pause
