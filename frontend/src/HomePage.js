import React from 'react';
import './App.css';

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Builder</h1>
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
  );
}

export default HomePage;
