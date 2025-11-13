@echo off
REM ============================================
REM Script Name: reset-db.bat
REM Purpose: Reset database (delete and recreate)
REM ============================================

echo.
echo ============================================
echo Reset Database
echo ============================================
echo.
echo WARNING: This will delete all data in the database!
echo.
set /p confirm="Are you sure you want to continue? (yes/no): "

if /i not "%confirm%"=="yes" (
    echo Operation cancelled.
    pause
    exit /b 0
)

REM Check if virtual environment exists
if not exist "..\venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    pause
    exit /b 1
)

echo.
echo Activating virtual environment...
call ..\venv\Scripts\activate.bat
echo.

echo [1/3] Deleting database file...
if exist "..\backend\db.sqlite3" (
    del /f "..\backend\db.sqlite3"
    echo Database deleted.
) else (
    echo Database file not found, skipping...
)
echo.

echo [2/3] Deleting migration files...
if exist "..\backend\api\migrations" (
    for %%f in (..\backend\api\migrations\*.py) do (
        if not "%%~nxf"=="__init__.py" (
            del /f "%%f"
        )
    )
    echo Migration files deleted.
)
echo.

echo [3/3] Running fresh migrations...
cd ..\backend
python manage.py makemigrations
python manage.py migrate
cd ..

echo.
echo ============================================
echo Database reset complete!
echo ============================================
echo.
echo Next step: Create a superuser
echo   scripts\create-superuser.bat
echo.
pause
