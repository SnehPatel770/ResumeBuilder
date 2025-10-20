# Backend Documentation

## Overview

The backend is built with Django and Django REST Framework, providing API endpoints for user authentication and resume management.

## API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/logout/` - User logout

### Resume Management
- `GET /api/resumes/` - List user resumes
- `POST /api/resumes/` - Create new resume
- `GET /api/resumes/{id}/` - Get specific resume
- `PUT /api/resumes/{id}/` - Update resume
- `DELETE /api/resumes/{id}/` - Delete resume

## Models

### User
- Extends Django's AbstractUser
- Additional fields: profile_picture, bio

### Resume
- Fields: user (ForeignKey), title, content (JSON), created_at, updated_at

## Setup

See the main README.md for setup instructions.

## Development

### Running Tests
```bash
cd backend
python manage.py test
```

### Code Style
- Follow PEP 8
- Use Black for formatting
- Use isort for import sorting
