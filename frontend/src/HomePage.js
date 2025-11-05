import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Header from './components/Header/Header';
import './pages/HomePage/HomePage.css';

const HomePage = () => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log('Get Started clicked - logging in guest user');
    const guestUser = {
      id: 'guest-user',
      email: 'guest@resumebuilder.com',
      name: 'Guest User',
      picture: 'https://ui-avatars.com/api/?name=Guest+User&background=3fa6ff&color=fff',
      token: 'guest-token'
    };
    
    setUser(guestUser);
    localStorage.setItem('user', JSON.stringify(guestUser));
    navigate('/editor');
  };

  return (
    <>
      <Header />
      <main className={`home-main ${theme}`}>
        <section className="hero">
          <h2>Create your professional resume in minutes</h2>
          <p>Our easy-to-use resume builder will help you create a resume that stands out.</p>
          {user ? (
            <Link to="/editor">
              <button className="cta-button">Continue Building</button>
            </Link>
          ) : (
            <button onClick={handleGetStarted} className="cta-button">
              Get Started for Free
            </button>
          )}
        </section>
        
        <section className="features">
          <h3>Features</h3>
          <div className="feature-cards">
            <div className="card">
              <h4>Professional Templates</h4>
              <p>Choose from 6 professionally designed templates for every industry.</p>
              <Link to="/templates" className="card-link">Browse Templates →</Link>
            </div>
            <div className="card">
              <h4>Easy to Use</h4>
              <p>Our intuitive interface makes it simple to build a professional resume.</p>
            </div>
            <div className="card">
              <h4>Download as PDF</h4>
              <p>Export your resume as a PDF to easily apply for jobs.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className={`home-footer ${theme}`}>
        <p>&copy; 2025 Resume Builder</p>
      </footer>
    </>
  );
}

export default HomePage;
