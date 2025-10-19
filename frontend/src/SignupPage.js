import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from './auth/AuthContext';
import { z } from 'zod';
import AuthLayout from './auth/AuthLayout';
import AuthInput from './auth/AuthInput';

// Placeholder Icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>;

const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Set the error on the confirmPassword field
});

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const validationResult = signupSchema.safeParse({ name, email, password, confirmPassword });

    if (!validationResult.success) {
      const formattedErrors = {};
      validationResult.error.errors.forEach(err => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setIsLoading(true);
    const result = await signup(validationResult.data);
    setIsLoading(false);

    if (result.success) {
      navigate('/editor'); // Redirect to the editor on success
    } else {
      // Handle potential signup errors from the backend
      setErrors({ form: result.error || 'An unexpected error occurred.' });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    // We can show a loading spinner here as well if desired
    const result = await loginWithGoogle(credentialResponse);
    if (result.success) {
      navigate('/editor');
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-2" noValidate>
          <AuthInput id="name" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" icon={<UserIcon />} error={errors.name} required />
          <AuthInput id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon={<EmailIcon />} error={errors.email} required />
          <AuthInput id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" icon={<LockIcon />} error={errors.password} required />
          <AuthInput id="confirm-password" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" icon={<LockIcon />} error={errors.confirmPassword} required />

          {errors.form && (
            <div className="auth-error" role="alert">
              {errors.form}
            </div>
          )}

          <button type="submit" className="w-full btn btn-primary !mt-4" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Signup Failed')}
            useOneTap
          />
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Log In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;