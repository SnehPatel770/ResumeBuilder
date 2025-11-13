@echo off
REM ============================================
REM Script Name: test-backend.bat
REM Purpose: Run Django tests
REM ============================================

echo.
echo ============================================
echo Running Backend Tests
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

echo Running Django tests...
cd ..\backend
python manage.py test
cd ..

echo.
echo ============================================
echo Tests completed!
echo ============================================
echo.
pause
