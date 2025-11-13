# Resume Builder - Batch Scripts

Complete automation scripts for Windows development workflow.

## Quick Start

```cmd
# First time setup
scripts\create-venv.bat
scripts\setup.bat
scripts\create-superuser.bat

# Start development
scripts\start-all.bat
```

## All Available Scripts

### 🚀 Setup Scripts

| Script | Purpose |
|--------|---------|
| `setup.bat` | Complete project setup (dependencies + migrations) |
| `create-venv.bat` | Create Python virtual environment |
| `install-backend.bat` | Install backend dependencies only |
| `install-frontend.bat` | Install frontend dependencies only |
| `check-env.bat` | Check environment and dependencies |

### 💻 Development Scripts

| Script | Purpose |
|--------|---------|
| `start-backend.bat` | Start Django server (port 8000) |
| `start-frontend.bat` | Start React server (port 3000) |
| `start-all.bat` | Start both servers in separate windows |
| `shell.bat` | Open Django shell |

### 🗄️ Database Scripts

| Script | Purpose |
|--------|---------|
| `migrate.bat` | Run database migrations |
| `reset-db.bat` | Reset database (delete and recreate) |
| `create-superuser.bat` | Create Django admin user |

### 🏗️ Build Scripts

| Script | Purpose |
|--------|---------|
| `build-frontend.bat` | Build React for production |
| `collectstatic.bat` | Collect Django static files |

### 🧪 Testing Scripts

| Script | Purpose |
|--------|---------|
| `test-backend.bat` | Run Django tests |
| `test-frontend.bat` | Run React tests |
| `lint-frontend.bat` | Run ESLint on frontend |

### 🧹 Maintenance Scripts

| Script | Purpose |
|--------|---------|
| `clean.bat` | Clean all build artifacts and caches |
| `help.bat` | Show all available scripts |

## Usage Examples

### Initial Setup
```cmd
# Create virtual environment
scripts\create-venv.bat

# Install all dependencies and run migrations
scripts\setup.bat

# Create admin user
scripts\create-superuser.bat
```

### Daily Development
```cmd
# Start both servers
scripts\start-all.bat

# Or start individually
scripts\start-backend.bat
scripts\start-frontend.bat
```

### Database Management
```cmd
# Apply new migrations
scripts\migrate.bat

# Reset database completely
scripts\reset-db.bat
```

### Testing
```cmd
# Run backend tests
scripts\test-backend.bat

# Run frontend tests
scripts\test-frontend.bat

# Lint frontend code
scripts\lint-frontend.bat
```

### Production Build
```cmd
# Build frontend for production
scripts\build-frontend.bat

# Collect static files
scripts\collectstatic.bat
```

### Troubleshooting
```cmd
# Check environment status
scripts\check-env.bat

# Clean and rebuild
scripts\clean.bat
scripts\setup.bat
```

## Script Features

- ✅ Error checking and validation
- ✅ Clear status messages
- ✅ Automatic virtual environment activation
- ✅ Dependency verification
- ✅ User confirmations for destructive operations
- ✅ Helpful error messages with solutions

## Access Points

After starting the servers:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin

## Notes

- All scripts should be run from the project root or scripts directory
- Virtual environment is automatically activated when needed
- Scripts check for required dependencies before running
- Destructive operations (clean, reset-db) require confirmation
