import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import './App.css';

const HomePage = () => {
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
            <Link to="/login"><button className="nav-button">Login</button></Link>
            <Link to="/signup"><button className="nav-button signup">Sign Up</button></Link>
          </nav>
        </header>
        <main className="App-main">
          <section className="hero">
            <h2>Create your professional resume in minutes</h2>
            <p>Our easy-to-use resume builder will help you create a resume that stands out.</p>
            <Link to="/editor"><button className="cta-button">Get Started for Free</button></Link>
          </section>
          <section className="features">
            <h3>Features</h3>
            <div className="feature-cards">
              <div className="card">
                <h4>Easy to Use</h4>
                <p>Our intuitive interface makes it simple to build a professional resume.</p>
              </div>
              <div className="card">
                <h4>Professional Templates</h4>
                <p>Choose from a variety of templates designed by experts.</p>
              </div>
              <div className="card">
                <h4>Download as PDF</h4>
                <p>Export your resume as a PDF to easily apply for jobs.</p>
              </div>
            </div>
          </section>
        </main>
        <footer className="App-footer">
          <p>&copy; 2025 Resume Builder</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
