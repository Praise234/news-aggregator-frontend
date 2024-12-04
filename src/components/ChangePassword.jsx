import React, { useState } from 'react';
import { changePasswordUrl } from '../utils/APIRoutes';
import { authStore } from './store/authStore';

const ChangePassword = () => {
  const { loginDetails } = authStore();
  const [formData, setFormData] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(changePasswordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginDetails.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password updated successfully.');
      } else {
        setMessage(data.message || 'Failed to update password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow rounded">
      {message && <p className="text-sm text-red-500">{message}</p>}
      <div className="flex flex-col">
        <label htmlFor="current_password" className="text-gray-700">Current Password</label>
        <input
          type="password"
          name="current_password"
          id="current_password"
          value={formData.current_password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="new_password" className="text-gray-700">New Password</label>
        <input
          type="password"
          name="new_password"
          id="new_password"
          value={formData.new_password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirm_password" className="text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="new_password_confirmation"
          id="new_password_confirmation"
          value={formData.new_password_confirmation}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
};

export default ChangePassword;
