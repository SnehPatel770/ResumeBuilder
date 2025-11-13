@echo off
REM ============================================
REM Script Name: shell.bat
REM Purpose: Open Django shell with virtual environment
REM ============================================

echo.
echo ============================================
echo Opening Django Shell
echo ============================================
echo.

REM Check if virtual environment exists
if not exist "..\venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    pause
    exit /b 1
)

echo Activating virtual environment...
call ..\venv\Scripts\activate.bat
echo.

echo Starting Django shell...
cd ..\backend
python manage.py shell
cd ..
