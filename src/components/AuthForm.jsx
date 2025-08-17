import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const AuthForm = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuth();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  // State for both forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      closeModal();
      navigate('/dashboard'); // Or wherever you want to redirect after login
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { first_name: firstName, last_name: lastName, email, password });
      // On success, switch to login view with a success message
      setIsLoginView(true);
      setError('Account created successfully! Please log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {isLoginView ? 'Welcome Back' : 'Create an Account'}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {isLoginView ? 'Log in to access your account.' : 'Join us and start shopping.'}
        </p>
      </div>

      {error && <p className={`px-4 py-3 text-sm rounded-lg ${error.includes('success') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>{error}</p>}

      {isLoginView ? (
        // Login Form
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <HiOutlineMail className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email Address" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition" />
          </div>
          <div className="relative">
            <HiOutlineLockClosed className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-indigo-400">
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      ) : (
        // Signup Form
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <HiOutlineUser className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="First Name" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition" />
            </div>
            <div className="relative w-1/2">
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required placeholder="Last Name" className="w-full pl-4 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition" />
            </div>
          </div>
          <div className="relative">
            <HiOutlineMail className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email Address" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition" />
          </div>
          <div className="relative">
            <HiOutlineLockClosed className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
            {/* The typo was here */}
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-indigo-400">
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      )}
      <p className="text-center text-sm text-gray-600">
        {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
        <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-medium text-indigo-600 hover:underline">
          {isLoginView ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
