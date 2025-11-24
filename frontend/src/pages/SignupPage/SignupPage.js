import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/Header/Header';
import GoogleSignInButton from '../../components/GoogleSignInButton/GoogleSignInButton';
import './SignupPage.css';

const SignupPage = () => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.first_name} ${data.user.last_name}`.trim(),
          picture: `https://robohash.org/${data.user.email}?set=set1&size=200x200`,
          token: data.token
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignup = () => {
    const demoUser = {
      id: 'demo-user',
      email: 'demo@example.com',
      name: 'Demo User',
      picture: 'https://robohash.org/demo@example.com?set=set1&size=200x200',
      token: 'demo-token'
    };
    
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className={`signup-container ${theme}`}>
        <div className="signup-card">
          <h2>Create Account</h2>
          <p>Join thousands of professionals building amazing resumes</p>
          
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="Enter your password (min 6 characters)"
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                placeholder="Confirm your password"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <GoogleSignInButton 
              text="Sign up with Google"
              onSuccess={() => navigate('/')}
            />
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <button 
              type="button"
              onClick={handleDemoSignup} 
              className="demo-signup-btn"
            >
              🚀 Try Demo Account
            </button>
          </form>
          
          <div className="features-list">
            <h3>What you'll get:</h3>
            <ul>
              <li>✨ Professional resume templates</li>
              <li>📱 Mobile-friendly editor</li>
              <li>💾 Cloud storage for your resumes</li>
              <li>📄 PDF export functionality</li>
              <li>🎨 Multiple theme options</li>
            </ul>
          </div>
          
          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
            <p>
              <Link to="/">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;