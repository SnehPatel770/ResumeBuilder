import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/Header/Header';
import GoogleSignInButton from '../../components/GoogleSignInButton/GoogleSignInButton';
import './LoginPage.css';

const LoginPage = () => {
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
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    console.log('Login form submitted!');
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.first_name} ${data.user.last_name}`.trim(),
          picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.first_name + ' ' + data.user.last_name)}&background=3fa6ff&color=fff`,
          token: data.token
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    console.log('Demo login button clicked!');
    const demoUser = {
      id: 'demo-user',
      email: 'demo@example.com',
      name: 'Demo User',
      picture: 'https://ui-avatars.com/api/?name=Demo+User&background=3fa6ff&color=fff',
      token: 'demo-token'
    };
    
    console.log('Setting user:', demoUser);
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    console.log('Navigating to home...');
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className={`login-container ${theme}`}>
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Sign in to continue building your resume</p>
          
          <form onSubmit={handleLogin} className="login-form">
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
                placeholder="Enter your password"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <GoogleSignInButton 
              text="Sign in with Google"
              onSuccess={() => navigate('/')}
            />
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <button 
              type="button"
              onClick={handleDemoLogin} 
              className="demo-login-btn-primary"
            >
              🚀 Demo Login
            </button>
          </form>
          
          <div className="login-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
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

export default LoginPage;