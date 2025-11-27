# Frontend Documentation

## Overview

The frontend is built with React, using React Router for navigation, Tailwind CSS for styling, and React OAuth Google for authentication.

## Components

### Authentication
- `AuthContext` - Manages authentication state
- `AuthLayout` - Layout wrapper for auth pages
- `AuthInput` - Styled input component
- `ProtectedRoute` - Route guard for authenticated users

### Pages
- `LoginPage` - User login form
- `SignupPage` - User registration form
- `EditorPage` - Resume editor with live preview
- `HomePage` - Landing page

## State Management

Uses React Context for authentication state management. Resume data is stored in localStorage for persistence.

## Styling

- Tailwind CSS for utility classes
- Custom CSS in `src/styles/` for component-specific styles
- Dark mode support using Tailwind's dark mode classes

## Setup

See the main README.md for setup instructions.

## Development

### Running Tests
```bash
cd frontend
npm test
```

### Building for Production
```bash
cd frontend
npm run build
```

### Code Style
- Use ESLint for linting
- Follow React best practices
- Use functional components with hooks
