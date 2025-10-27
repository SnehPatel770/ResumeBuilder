import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import { useTheme } from '../contexts/ThemeContext';

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3fa6ff
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="App">
      <div className="App-content">
        <header className="App-header">
          <h1>Resume Builder</h1>
          <nav>
            <button
              onClick={toggleTheme}
              className="nav-button"
              style={{ marginRight: '10px' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link to="/login"><button className="nav-button">Login</button></Link>
            <Link to="/signup"><button className="nav-button signup">Sign Up</button></Link>
          </nav>
        </header>
        <main className="App-main">
          <section className="hero">
            <h2>Build Your Dream Career with a Stunning Resume</h2>
            <p>Transform your professional story into a compelling resume that gets noticed. Our AI-powered builder creates personalized resumes in minutes.</p>
            <div className="hero-actions">
              <Link to="/editor"><button className="cta-button primary">Start Building Now</button></Link>
              <button className="cta-button secondary">Watch Demo</button>
            </div>
          </section>
          <section className="features">
            <h3>Why Choose Our Resume Builder?</h3>
            <div className="feature-cards">
              <div className="card">
                <div className="card-icon">🚀</div>
                <h4>AI-Powered Suggestions</h4>
                <p>Get intelligent recommendations to optimize your resume for specific job roles and industries.</p>
              </div>
              <div className="card">
                <div className="card-icon">🎨</div>
                <h4>Beautiful Templates</h4>
                <p>Choose from dozens of professionally designed templates that make your resume stand out.</p>
              </div>
              <div className="card">
                <div className="card-icon">📱</div>
                <h4>Mobile Friendly</h4>
                <p>Build and edit your resume on any device. Your work syncs automatically across platforms.</p>
              </div>
              <div className="card">
                <div className="card-icon">📄</div>
                <h4>Multiple Formats</h4>
                <p>Export your resume as PDF, Word, or plain text. Perfect for any application system.</p>
              </div>
              <div className="card">
                <div className="card-icon">🔒</div>
                <h4>Secure & Private</h4>
                <p>Your data is encrypted and stored securely. We never share your personal information.</p>
              </div>
              <div className="card">
                <div className="card-icon">💼</div>
                <h4>Career Guidance</h4>
                <p>Get tips and insights to improve your resume and advance your career.</p>
              </div>
            </div>
          </section>
          <section className="testimonials">
            <h3>What Our Users Say</h3>
            <div className="testimonial-cards">
              <div className="testimonial">
                <p>"This resume builder helped me land my dream job! The templates are amazing and the process was so easy."</p>
                <cite>- Sarah Johnson, Software Engineer</cite>
              </div>
              <div className="testimonial">
                <p>"I was skeptical at first, but the AI suggestions really improved my resume. Highly recommend!"</p>
                <cite>- Michael Chen, Marketing Manager</cite>
              </div>
              <div className="testimonial">
                <p>"The mobile app is fantastic. I can edit my resume on the go. Great work!"</p>
                <cite>- Emily Davis, Graphic Designer</cite>
              </div>
            </div>
          </section>
        </main>
        <footer className="App-footer">
          <div className="footer-content">
            <p>&copy; 2025 Resume Builder. All rights reserved.</p>
            <nav className="footer-nav">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact Us</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
