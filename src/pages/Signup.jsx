// Create this file at: src/pages/Signup.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const payload = { first_name: firstName, last_name: lastName, email, password };

    try {
      await axios.post('http://localhost:5000/api/auth/signup', payload);
      // On successful signup, redirect to login page with a success message
      navigate('/login', { state: { successMessage: 'Account created successfully! Please log in.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
          <p className="mt-2 text-sm text-gray-500">Join us and start shopping today.</p>
        </div>
        
        {error && <p className="px-4 py-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <HiOutlineUser className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="First Name" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition" />
            </div>
            <div className="relative w-1/2">
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required placeholder="Last Name" className="w-full pl-4 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition" />
            </div>
          </div>
          <div className="relative">
            <HiOutlineMail className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email Address" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition" />
          </div>
          <div className="relative">
            <HiOutlineLockClosed className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-indigo-400">
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
