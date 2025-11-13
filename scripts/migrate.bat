@echo off
REM ============================================
REM Script Name: migrate.bat
REM Purpose: Run Django database migrations
REM ============================================

echo.
echo ============================================
echo Running Database Migrations
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

cd ..\backend

echo [1/2] Creating migration files...
python manage.py makemigrations
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create migrations
    cd ..
    pause
    exit /b 1
)
echo.

echo [2/2] Applying migrations to database...
python manage.py migrate
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to apply migrations
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ============================================
echo Migrations completed successfully!
echo ============================================
echo.
pause
