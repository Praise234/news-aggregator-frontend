import React, { useState } from 'react';
import { verifyEmailUrl } from '../utils/APIRoutes';
import { authStore } from './store/authStore';

const VerifyEmail = () => {
  const { loginDetails } = authStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

//   console.log(loginDetails);

  const handleVerify = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(verifyEmailUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${loginDetails.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        
        setMessage('Verification email sent successfully.');
      } else {
        setMessage(data.message || 'Failed to send verification email.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      setMessage('Failed to send verification email.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-4 bg-white shadow rounded">
        {loginDetails.user.email_verified_at === null ? <>
      <p className="mb-2 text-gray-700">Click the button below to send a verification email to your registered email address.</p>
      {message && <p className="text-sm text-green-500">{message}</p>}
        <button
            onClick={handleVerify}
            className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
            >
            {loading ? 'Sending...' : 'Send Verification Email'}
            </button>
        </> :
        <p className='font-[600] text-[30px]'>Verified!</p>
        }
    </div>
  );
};

export default VerifyEmail;
