import React, { useState } from 'react';
import GoogleAuthWrapper from '../components/LoginButton';

const LoginPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSuccess = (token) => {
        // Here you would save the token and update your app's state
        console.log("User is authenticated and token received:", token);
        setIsAuthenticated(true);
        // Redirect to dashboard or update UI
    };

    const handleFailure = (error) => {
        alert("Login failed. Check console for details.");
    };

    if (isAuthenticated) {
        return <h1>Welcome to the Dashboard!</h1>;
    }

    return (
        <div className="login-container">
            <h2>Sign In</h2>
            
            <div className="social-login-section">
                {/* 🚀 GOOGLE LOGIN */}
                <GoogleAuthWrapper onSuccess={handleSuccess} onFailure={handleFailure} />
                
                {/* Add other social login buttons here, following a similar pattern */}
                <button>Sign in with GitHub (API call to a different Django endpoint)</button>
            </div>
            
            <div className="divider">OR</div>

            {/* Standard Email/Password Form */}
            <form className="email-login-form">
                {/* ... inputs and login logic ... */}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;