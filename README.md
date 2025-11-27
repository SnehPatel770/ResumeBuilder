# Resume Builder - AI-Powered Resume Creation Tool

A modern, full-stack resume builder with AI assistance, multiple templates, and real-time preview.

## ✨ Features

- **AI-Powered Content** - Google Gemini AI suggestions for all resume sections
- **Multiple Templates** - Professional, Creative, and Minimal designs
- **Real-Time Preview** - See changes instantly
- **PDF Export** - Download professional PDFs
- **Dark/Light Theme** - Comfortable editing
- **Google OAuth** - Quick sign-in
- **Database Storage** - Persistent resume storage
- **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Cloud account (for OAuth and Gemini API)

### Installation

```bash
# 1. Run setup
scripts\setup.bat

# 2. Configure environment
# Create backend/.env:
GEMINI_API_KEY=your_api_key
SECRET_KEY=your_secret_key
DEBUG=True

# Create frontend/.env:
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_URL=http://localhost:8000

# 3. Start application
scripts\start-all.bat

# 4. Open browser
http://localhost:3000
```

## 📁 Project Structure

```
resume-builder/
├── api/                    # Django API app
│   ├── models.py          # Database models
│   ├── views.py           # API endpoints
│   └── urls.py            # URL routing
├── backend/               # Django project
│   ├── backend/          # Settings
│   └── manage.py
├── frontend/             # React app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── contexts/    # React contexts
│   │   └── pages/       # Page components
│   └── package.json
└── scripts/             # Utility scripts
```

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized origins: `http://localhost:3000`
5. Copy Client ID to `frontend/.env`

### Gemini AI Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `backend/.env` as `GEMINI_API_KEY`

**Rate Limits (Free Tier)**:
- 15 requests per minute
- 1,500 requests per day
- Wait 60 seconds between requests if you hit the limit

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/google/` - Google OAuth

### Resumes
- `GET /api/resumes/` - List all resumes
- `POST /api/resumes/` - Create resume
- `GET /api/resumes/:id/` - Get resume
- `PUT /api/resumes/:id/` - Update resume
- `DELETE /api/resumes/:id/` - Delete resume

### AI
- `POST /api/ai/suggest/` - Get AI suggestions (10 req/min limit)

## 🎯 Usage

### Creating a Resume

1. Sign in with Google or create account
2. Go to Editor from dashboard
3. Fill in sections (Personal Info, Summary, Experience, Education, Skills)
4. Use **✨ AI icon** for suggestions
5. Preview in real-time
6. Save and export as PDF

### Using AI Assistance

1. Click **✨ sparkle icon** in any textarea
2. Wait for AI suggestion (2-5 seconds)
3. Edit if needed
4. Click **Apply** to use it

**Note**: Free tier has 15 requests/minute. Wait 60 seconds if you hit the limit.

## 🛠️ Available Scripts

### Essential
- `scripts\start-all.bat` - Start both servers
- `scripts\start-backend.bat` - Start Django
- `scripts\start-frontend.bat` - Start React
- `scripts\setup.bat` - Initial setup

### Database
- `scripts\migrate.bat` - Run migrations
- `scripts\reset-db.bat` - Reset database
- `scripts\create-superuser.bat` - Create admin

### Utilities
- `scripts\install-backend.bat` - Install Python deps
- `scripts\install-frontend.bat` - Install Node deps
- `scripts\clean.bat` - Clean build files
- `scripts\help.bat` - Show all scripts

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Need 3.8+

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Run migrations
python backend/manage.py migrate
```
  
### Frontend won't start
```bash    
# Check Node version
node --version  # Need 16+

# Reinstall dependencies for frontend
cd frontend
rm -rf node_modules
npm install
```

### AI not working
- Check `GEMINI_API_KEY` in `backend/.env`
- Verify internet connection
- Check rate limits (15 req/min)
- Wait 60 seconds and try again

### Google OAuth fails
- Verify Client ID in `frontend/.env`
- Check authorized origins in Google Console
- Clear browser cache
- Try incognito mode

### PDF export issues
- Check if jsPDF is loaded (browser console)
- Try print-to-PDF as fallback
- Update browser to latest version

## 🔒 Security

- ✅ API keys in environment variables
- ✅ CORS configured
- ✅ CSRF protection enabled
- ✅ Password hashing
- ✅ OAuth 2.0
- ✅ Rate limiting on AI endpoint

## 📊 Tech Details

### Database Models
- **UserProfile** - Extended user info with Google ID
- **Resume** - Resume data with template and user relationship

### Frontend State
- **AuthContext** - User authentication
- **ThemeContext** - Dark/light theme
- **TemplateContext** - Resume templates

### API Rate Limiting
- AI endpoint: 10 requests/minute per IP
- Automatic retry with exponential backoff
- Clear error messages

## 🚧 Roadmap

### Planned Features
- [ ] DOCX export
- [ ] Resume sharing links
- [ ] Cover letter generator
- [ ] ATS optimization
- [ ] Resume scoring
- [ ] LinkedIn import
- [ ] Collaboration features
- [ ] Mobile app

### Completed
- [x] AI-powered suggestions
- [x] PDF export
- [x] Multiple templates
- [x] Dark mode
- [x] Google OAuth
- [x] Database storage
- [x] Rate limiting
- [x] Error boundary

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for content generation
- React team for the framework
- Django team for the backend
- All contributors and users

---

**Built with ❤️ for job seekers worldwide**

For detailed setup and troubleshooting, see `SETUP.md` and `TROUBLESHOOTING.md`.


<!-- This is a test update. -->
<!-- This is a updates in readme file for future someoned-->