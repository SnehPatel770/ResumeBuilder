@echo off
REM ============================================
REM Script Name: help.bat
REM Purpose: Display all available scripts
REM ============================================

echo.
echo ============================================
echo Resume Builder - Available Scripts
echo ============================================
echo.
echo SETUP SCRIPTS:
echo   setup.bat              - Complete project setup
echo   create-venv.bat        - Create Python virtual environment
echo   install-backend.bat    - Install backend dependencies only
echo   install-frontend.bat   - Install frontend dependencies only
echo   check-env.bat          - Check environment and dependencies
echo.
echo DEVELOPMENT SCRIPTS:
echo   start-backend.bat      - Start Django server
echo   start-frontend.bat     - Start React server
echo   start-all.bat          - Start both servers
echo   shell.bat              - Open Django shell
echo.
echo DATABASE SCRIPTS:
echo   migrate.bat            - Run database migrations
echo   reset-db.bat           - Reset database (delete and recreate)
echo   create-superuser.bat   - Create Django admin user
echo.
echo BUILD SCRIPTS:
echo   build-frontend.bat     - Build React for production
echo   collectstatic.bat      - Collect Django static files
echo.
echo TESTING SCRIPTS:
echo   test-backend.bat       - Run Django tests
echo   test-frontend.bat      - Run React tests
echo   lint-frontend.bat      - Run ESLint on frontend
echo.
echo MAINTENANCE SCRIPTS:
echo   clean.bat              - Clean all build artifacts
echo   help.bat               - Show this help message
echo.
echo ============================================
echo Quick Start:
echo ============================================
echo.
echo 1. First time setup:
echo    scripts\create-venv.bat
echo    scripts\setup.bat
echo.
echo 2. Create admin user:
echo    scripts\create-superuser.bat
echo.
echo 3. Start development:
echo    scripts\start-all.bat
echo.
echo 4. Access the app:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8000
echo    Admin:    http://localhost:8000/admin
echo.
pause
