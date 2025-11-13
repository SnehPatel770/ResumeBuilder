@echo off
REM ============================================
REM Script Name: collectstatic.bat
REM Purpose: Collect Django static files
REM ============================================

echo.
echo ============================================
echo Collecting Static Files
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

echo Collecting static files...
cd ..\backend
python manage.py collectstatic --noinput
cd ..

echo.
echo ============================================
echo Static files collected!
echo ============================================
echo.
pause
