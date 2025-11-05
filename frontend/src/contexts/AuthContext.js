import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Google Auth
    const initializeGoogleAuth = async () => {
      try {
        // Debug: Check what Client ID is being read
        console.log('Environment REACT_APP_GOOGLE_CLIENT_ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
        
        // Check if Google Client ID is configured
        if (!process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID === 'your_google_client_id_here') {
          console.warn('Google Client ID not configured. Current value:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
          setLoading(false);
          return;
        }

        console.log('Initializing Google Auth with Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);

        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        console.log('Google Auth initialized successfully');

        // Check for existing session
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeGoogleAuth();
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      console.log('Google response received:', response);
      
      // Send to backend for verification/storage
      const backendResponse = await fetch('http://localhost:8000/api/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      if (backendResponse.ok) {
        const data = await backendResponse.json();
        console.log('Backend response:', data);
        
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          picture: data.user.picture,
          token: response.credential
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to home page
        window.location.href = '/';
      } else {
        console.error('Backend authentication failed');
        alert('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const login = () => {
    console.log('Login clicked. Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
    
    if (!process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID === 'your_google_client_id_here') {
      alert(`Google Auth not configured yet!\n\nCurrent Client ID: ${process.env.REACT_APP_GOOGLE_CLIENT_ID}\n\nTo fix:\n1. Restart the development server (Ctrl+C then npm run dev)\n2. Check that .env file exists in frontend folder\n3. Ensure no spaces around the = in .env file`);
      return;
    }
    
    if (window.google && window.google.accounts) {
      console.log('Prompting Google Auth...');
      try {
        // Try the prompt method first
        window.google.accounts.id.prompt((notification) => {
          console.log('Google prompt notification:', notification);
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('Prompt was not displayed or skipped, trying renderButton approach');
            // If prompt doesn't work, we'll fall back to the button approach
          }
        });
      } catch (error) {
        console.error('Error with Google prompt:', error);
        alert('There was an issue with Google Auth. Please try the demo login or check the console for errors.');
      }
    } else {
      alert('Google Auth is still loading. Please try again in a moment.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.google.accounts.id.disableAutoSelect();
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    loading,
    handleGoogleResponse
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};