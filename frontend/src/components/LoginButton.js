import React from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const DJANGO_GOOGLE_LOGIN_URL = 'http://localhost:8000/api/auth/google/login/';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
    
    const handleGoogleSuccess = async (response) => {
        const idToken = response.credential;
        console.log('Google ID Token:', idToken);

        try {
            // Send the Google ID Token to the Django backend
            const apiResponse = await axios.post(DJANGO_GOOGLE_LOGIN_URL, {
                access_token: idToken, // dj-rest-auth uses 'access_token' for the ID Token
            });

            // On success, Django returns JWT tokens (access and refresh) in the cookies
            // or in the response body if you configured it that way.
            const accessToken = apiResponse.data.access_token; 
            
            // 💡 IMPORTANT: You must store the tokens (e.g., in LocalStorage or HttpOnly Cookies) 
            // and use the Access Token for subsequent authenticated API calls.

            console.log('Login Successful! Django Token:', accessToken);
            onSuccess(accessToken); // Call a function to redirect or update user state

        } catch (error) {
            console.error('Django API Login Failed:', error.response?.data || error.message);
            onFailure(error);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google Login Failed:', error);
        onFailure(error);
    };

    return (
        // The GoogleLogin component handles the popup/redirect flow
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            text="signin_with"
            // Ensure the client ID here matches the one registered in GCP AND Django
            // This is the WEB Client ID
        />
    );
};

// Wrap the component with the provider in your main App.js or index.js
const GoogleAuthWrapper = ({ onSuccess, onFailure }) => {
    // Replace with your actual Google Client ID (the WEB application one from GCP)
    const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_FROM_GCP'; 
    
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLoginButton onSuccess={onSuccess} onFailure={onFailure} />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthWrapper;