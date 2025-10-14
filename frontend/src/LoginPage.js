import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { email, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Logging in with Google');
  };

  return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit" style={{ padding: '10px 20px', margin: '10px' }}>Login</button>
      </form>
      <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', margin: '10px' }}>Login with Google</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
