@echo off
REM ============================================
REM Script Name: install-backend.bat
REM Purpose: Install backend dependencies only
REM ============================================

echo.
echo ============================================
echo Installing Backend Dependencies
echo ============================================
echo.

REM Check if virtual environment exists
if not exist "..\venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo.
    echo Please create a virtual environment first:
    echo   python -m venv venv
    echo.
    pause
    exit /b 1
)

echo Activating virtual environment...
call ..\venv\Scripts\activate.bat
echo.

echo Installing Python packages from requirements.txt...
cd ..\backend
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ============================================
echo Backend dependencies installed successfully!
echo ============================================
echo.
pause
