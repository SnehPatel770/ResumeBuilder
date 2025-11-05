import React, { useState } from 'react';
import './GoogleAuthHelper.css';

const GoogleAuthHelper = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="google-auth-helper">
      <button 
        onClick={() => setShowHelp(!showHelp)}
        className="help-toggle-btn"
      >
        {showHelp ? '❌ Hide Help' : '❓ Google Auth Not Working?'}
      </button>
      
      {showHelp && (
        <div className="help-content">
          <h4>🔧 Google Auth Error 401 Fix:</h4>
          <div className="help-steps">
            <p><strong>1. Go to Google Cloud Console</strong></p>
            <p><strong>2. Find your OAuth client:</strong><br/>
               <code>175026454956-qer1sdfj396apm2jrkneqqijc7p231ft.apps.googleusercontent.com</code>
            </p>
            <p><strong>3. Add these Authorized JavaScript origins:</strong></p>
            <ul>
              <li><code>http://localhost:3000</code></li>
              <li><code>http://127.0.0.1:3000</code></li>
            </ul>
            <p><strong>4. Save and wait 5-10 minutes</strong></p>
          </div>
          
          <div className="help-tip">
            <p>💡 <strong>Quick Tip:</strong> Use the Demo Login button below to test the app immediately while Google updates!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleAuthHelper;