import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const HomePage = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(window.VANTA.NET({
        el: vantaRef.current,
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
          <div>
            <Link to="/login"><button className="cta-button">Login</button></Link>
            <Link to="/signup"><button className="cta-button">Sign Up</button></Link>
          </div>
        </header>
        <main className="App-main">
          <h2>Create your professional resume in minutes</h2>
          <p>Our easy-to-use resume builder will help you create a resume that stands out.</p>
          <button className="cta-button">Get Started</button>
        </main>
        <footer className="App-footer">
          <p>&copy; 2025 Resume Builder</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
