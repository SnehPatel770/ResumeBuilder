@echo off
REM ============================================
REM Script Name: clean.bat
REM Purpose: Clean all build artifacts and caches
REM ============================================

echo.
echo ============================================
echo Cleaning Project
echo ============================================
echo.
echo This will remove:
echo   - Frontend build folder
echo   - Frontend node_modules
echo   - Python cache files
echo   - Database file
echo.
set /p confirm="Continue? (yes/no): "

if /i not "%confirm%"=="yes" (
    echo Operation cancelled.
    pause
    exit /b 0
)

echo.
echo [1/5] Cleaning frontend build...
if exist "..\frontend\build" (
    rmdir /s /q "..\frontend\build"
    echo Frontend build removed.
) else (
    echo No build folder found.
)
echo.

echo [2/5] Cleaning node_modules...
if exist "..\frontend\node_modules" (
    echo This may take a while...
    rmdir /s /q "..\frontend\node_modules"
    echo node_modules removed.
) else (
    echo No node_modules found.
)
echo.

echo [3/5] Cleaning Python cache...
for /d /r "..\backend" %%d in (__pycache__) do @if exist "%%d" rmdir /s /q "%%d"
for /r "..\backend" %%f in (*.pyc) do @if exist "%%f" del /f "%%f"
echo Python cache cleaned.
echo.

echo [4/5] Cleaning database...
if exist "..\backend\db.sqlite3" (
    del /f "..\backend\db.sqlite3"
    echo Database removed.
) else (
    echo No database found.
)
echo.

echo [5/5] Cleaning migration files...
if exist "..\backend\api\migrations" (
    for %%f in (..\backend\api\migrations\*.py) do (
        if not "%%~nxf"=="__init__.py" (
            del /f "%%f"
        )
    )
    echo Migration files cleaned.
)
echo.

echo ============================================
echo Cleaning complete!
echo ============================================
echo.
echo To rebuild the project, run:
echo   scripts\setup.bat
echo.
pause
