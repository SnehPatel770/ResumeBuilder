# Scripts Directory

Utility scripts for managing the Resume Builder project.

## Essential Scripts

### Development
- **start-all.bat** - Start both backend and frontend servers
- **start-backend.bat** - Start Django development server
- **start-frontend.bat** - Start React development server

### Setup
- **setup.bat** - Complete project setup (run once)
- **install-backend.bat** - Install Python dependencies
- **install-frontend.bat** - Install Node dependencies
- **create-venv.bat** - Create Python virtual environment

### Database
- **migrate.bat** - Run database migrations
- **reset-db.bat** - Reset database (⚠️ deletes all data)
- **create-superuser.bat** - Create Django admin user
- **shell.bat** - Open Django shell

### Utilities
- **clean.bat** - Clean build files and caches
- **build-frontend.bat** - Build production frontend
- **check-env.bat** - Verify environment setup
- **help.bat** - Show all available scripts

## Usage

### First Time Setup
```bash
# Run complete setup
scripts\setup.bat

# Or step by step:
scripts\create-venv.bat
scripts\install-backend.bat
scripts\install-frontend.bat
scripts\migrate.bat
```

### Daily Development
```bash
# Start both servers
scripts\start-all.bat

# Or separately:
scripts\start-backend.bat  # Terminal 1
scripts\start-frontend.bat # Terminal 2
```

### Database Management
```bash
# After model changes
scripts\migrate.bat

# Create admin user
scripts\create-superuser.bat

# Reset database (careful!)
scripts\reset-db.bat
```

### Maintenance
```bash
# Clean build files
scripts\clean.bat

# Check environment
scripts\check-env.bat

# Build for production
scripts\build-frontend.bat
```

## Script Details

### start-all.bat
Starts both backend and frontend servers in separate windows.
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

### setup.bat
Complete project setup including:
- Virtual environment creation
- Dependency installation
- Database setup
- Directory creation

### migrate.bat
Runs Django migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### reset-db.bat
⚠️ **Warning**: Deletes all data!
- Deletes db.sqlite3
- Runs fresh migrations
- Use only for development

### clean.bat
Removes:
- Python cache files (__pycache__)
- Build directories
- Temporary files

## Troubleshooting

### Script won't run
- Check you're in project root directory
- Ensure virtual environment is activated
- Run `scripts\check-env.bat` to verify setup

### Backend won't start
- Check Python version: `python --version`
- Activate venv: `venv\Scripts\activate`
- Install deps: `scripts\install-backend.bat`
- Run migrations: `scripts\migrate.bat`

### Frontend won't start
- Check Node version: `node --version`
- Install deps: `scripts\install-frontend.bat`
- Clear cache: `npm cache clean --force`

## Adding New Scripts

When creating new scripts:
1. Use `.bat` extension for Windows
2. Add error handling
3. Add descriptive echo messages
4. Update this README
5. Add to help.bat

## Notes

- All scripts assume you're in the project root directory
- Scripts use relative paths
- Virtual environment is automatically activated when needed
- Check `help.bat` for quick reference
