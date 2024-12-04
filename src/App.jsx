import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Articles from './components/Articles';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import { authStore } from './components/store/authStore';
import SingleArticle from './components/SingleArticle';
import VerificationTool from './components/VerificationTool';

const App = () => {
  const { isLogin } = authStore();

  const isLoggedIn = !!isLogin; // Check if the user is logged in
  


  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/articles" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/articles" element={isLoggedIn ? <Articles /> : <Navigate to="/login" />} />
        <Route path="/articles/:id" element={isLoggedIn ? <SingleArticle /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/verify-email/:id/:hash" element={<VerificationTool />} />
      </Routes>
    </>
  );
};

export default App;
