@echo off
REM ============================================
REM Script Name: build-frontend.bat
REM Purpose: Build React app for production
REM ============================================

echo.
echo ============================================
echo Building React Frontend for Production
echo ============================================
echo.

REM Check if node_modules exists
if not exist "..\frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    echo Please run: scripts\install-frontend.bat
    pause
    exit /b 1
)

echo Building production bundle...
cd ..\frontend
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ============================================
echo Build completed successfully!
echo ============================================
echo.
echo Production files are in: frontend\build
echo.
pause
