import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const GoogleSignInButton = ({ text = "Sign in with Google", onSuccess, onError }) => {
  const buttonRef = useRef(null);
  const { handleGoogleResponse } = useAuth();

  useEffect(() => {
    if (window.google && buttonRef.current) {
      try {
        window.google.accounts.id.renderButton(
          buttonRef.current,
          {
            theme: 'outline',
            size: 'large',
            text: text === "Sign in with Google" ? "signin_with" : "signup_with",
            width: '100%'
          }
        );
        console.log('Google button rendered successfully');
      } catch (error) {
        console.error('Error rendering Google button:', error);
      }
    }
  }, [text]);

  const handleClick = () => {
    console.log('Google button clicked');
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div>
      <div ref={buttonRef}></div>
      {/* Fallback button if Google button doesn't render */}
      <button 
        onClick={handleClick}
        style={{
          display: 'none', // Will be shown via CSS if Google button fails
          width: '100%',
          padding: '12px',
          border: '1px solid #dadce0',
          borderRadius: '8px',
          backgroundColor: 'white',
          color: '#3c4043',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          marginTop: '10px'
        }}
        className="fallback-google-btn"
      >
        🔄 {text} (Fallback)
      </button>
    </div>
  );
};

export default GoogleSignInButton;