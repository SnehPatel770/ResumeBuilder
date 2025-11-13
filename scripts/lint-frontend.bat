@echo off
REM ============================================
REM Script Name: lint-frontend.bat
REM Purpose: Run ESLint on frontend code
REM ============================================

echo.
echo ============================================
echo Linting Frontend Code
echo ============================================
echo.

REM Check if node_modules exists
if not exist "..\frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    pause
    exit /b 1
)

echo Running ESLint...
cd ..\frontend
call npx eslint src --ext .js,.jsx
cd ..

echo.
echo ============================================
echo Linting complete!
echo ============================================
echo.
pause
