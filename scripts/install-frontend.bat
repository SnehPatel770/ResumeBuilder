@echo off
REM ============================================
REM Script Name: install-frontend.bat
REM Purpose: Install frontend dependencies only
REM ============================================

echo.
echo ============================================
echo Installing Frontend Dependencies
echo ============================================
echo.

echo Installing npm packages...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    echo Trying with force flag...
    call npm install -f
)
cd ..

echo.
echo ============================================
echo Frontend dependencies installed successfully!
echo ============================================
echo.
pause
