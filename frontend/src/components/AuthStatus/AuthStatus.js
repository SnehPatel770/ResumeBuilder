import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AuthStatus = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999
      }}>
        🔄 Loading Auth...
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: user ? 'rgba(0,128,0,0.8)' : 'rgba(128,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '200px'
    }}>
      {user ? (
        <div>
          ✅ Logged in as:<br/>
          {user.name}<br/>
          {user.email}
        </div>
      ) : (
        <div>
          ❌ Not logged in<br/>
          Google ID: {process.env.REACT_APP_GOOGLE_CLIENT_ID ? '✅' : '❌'}
        </div>
      )}
    </div>
  );
};

export default AuthStatus;