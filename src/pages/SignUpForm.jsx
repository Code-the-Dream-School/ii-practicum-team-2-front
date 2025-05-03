import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import shape1 from '../assets/shape1.png';
import DOMPurify from 'dompurify';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState(null);
  const hideError = () => setError(null);
  const showError = (message) => setError(message);

  const { register, isLoading } = useRegister({
    onError: showError,
    onSuccess: hideError,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Please enter a valid email address');
      return false;
    }

    
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!nameRegex.test(formData.name)) {
      showError('Name must be at least 2 characters long and contain only letters and spaces');
      return false;
    }

    
    const passwordRegex = /^(?=.*[0-7])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      showError('Password must be at least 8 characters long, include 1 number and 1 special character');
      return false;
    }

    
    if (formData.password !== formData.password_confirmation) {
      showError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hideError(); 

    if (!validateForm()) {
      return;
    }

    const sanitizedData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      password: DOMPurify.sanitize(formData.password),
      password_confirmation: DOMPurify.sanitize(formData.password_confirmation),
    };
    register(sanitizedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
      <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-6 pb-6 w-[450px]">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-blue-600 text-white p-2 rounded mb-3">
            <img src={shape1} alt="Logo" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Re-enter password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password_confirmation}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mb-0"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create an account'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              disabled={isLoading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;