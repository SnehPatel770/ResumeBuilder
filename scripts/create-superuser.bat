@echo off
REM ============================================
REM Script Name: create-superuser.bat
REM Purpose: Create Django admin superuser
REM ============================================

echo.
echo ============================================
echo Create Django Superuser
echo ============================================
echo.

REM Check if virtual environment exists
if not exist "..\venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run setup first: scripts\setup.bat
    pause
    exit /b 1
)

echo Activating virtual environment...
call ..\venv\Scripts\activate.bat
echo.

echo Creating superuser for Django admin...
echo You will be prompted for username, email, and password
echo.
cd ..\backend
python manage.py createsuperuser
cd ..

echo.
echo Superuser created! You can now access admin at:
echo http://localhost:8000/admin
echo.
pause
