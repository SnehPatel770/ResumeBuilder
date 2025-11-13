@echo off
REM ============================================
REM Script Name: create-venv.bat
REM Purpose: Create Python virtual environment
REM ============================================

echo.
echo ============================================
echo Creating Virtual Environment
echo ============================================
echo.

REM Check if Python is installed
python --version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python not found!
    echo Please install Python from: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if venv already exists
if exist "..\venv" (
    echo Virtual environment already exists!
    echo.
    set /p confirm="Delete and recreate? (yes/no): "
    if /i not "!confirm!"=="yes" (
        echo Operation cancelled.
        pause
        exit /b 0
    )
    echo Deleting existing virtual environment...
    rmdir /s /q "..\venv"
)

echo Creating virtual environment...
cd ..
python -m venv venv
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)
cd scripts

echo.
echo ============================================
echo Virtual environment created successfully!
echo ============================================
echo.
echo Next steps:
echo   1. Install dependencies: scripts\setup.bat
echo   2. Or install backend only: scripts\install-backend.bat
echo.
pause
