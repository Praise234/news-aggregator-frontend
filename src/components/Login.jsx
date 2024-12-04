import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Bannerbg from "../assets/Bannerbg.jpg";
import { login } from "../utils/APIRoutes";
import { authStore } from './store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
//   const navigate = useNavigate();
const { setIsLogin, setLoginDetails } = authStore();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      setIsLogin(true); // Set login status to true
      setLoginDetails(data); // Save login details

      localStorage.setItem('news_aggregator_token', JSON.stringify(data)); // Save token in localStorage
    //   navigate('/articles'); // Redirect to articles page
        window.location.href = '/articles';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${Bannerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="absolute bg-white p-6 rounded shadow-md w-80 z-[60]">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {/* Additional Links */}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline text-sm"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/forgot_password')}
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
