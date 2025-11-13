import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle signup logic here
    console.log('Signing up with:', { email, password });
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log('Signing up with Google');
  };

  return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px', width: '300px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px', width: '300px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px', width: '300px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', margin: '10px' }}>Sign Up</button>
      </form>
      <button onClick={handleGoogleSignup} style={{ padding: '10px 20px', margin: '10px' }}>Sign up with Google</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
