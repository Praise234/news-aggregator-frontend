import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authStore } from './store/authStore';

const Navbar = () => {
  const navigate = useNavigate();

  const { setIsLogin, setLoginDetails } = authStore();

  const handleLogout = () => {
    setIsLogin(false); // Set login status to false
    setLoginDetails({}); // Clear login details

    localStorage.removeItem('news_aggregator_token'); // Remove token
    // navigate('/login'); // Redirect to login
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 text-white w-full flex justify-center">
        <div className='w-full lg:max-w-[80em] p-4 flex justify-between'>
            <div className="flex gap-4">
                <Link to="/articles" className="hover:underline">Articles</Link>
                <Link to="/settings" className="hover:underline">Settings</Link>
            </div>
            <button onClick={handleLogout} className="hover:underline">
                Logout
            </button>
        </div>
    </nav>
  );
};

export default Navbar;
