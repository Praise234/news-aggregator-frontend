import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verificationUrl } from '../utils/APIRoutes';
import { authStore } from './store/authStore';

const VerificationTool = () => {
  const { id, hash } = useParams();
  const { loginDetails, setLoginDetails } = authStore();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const expires = urlParams.get('expires');
  const signature = urlParams.get('signature');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${verificationUrl}${id}/${hash}?expires=${expires}&signature=${signature}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginDetails.token}`,
          },
        });

        if (response.ok) {
          setStatus('Email verified successfully!');
          setTimeout(() => navigate('/settings'), 3000); // Redirect after success
        } else {
          const errorData = await response.json();
          setStatus(`Error: ${errorData.message || 'Failed to verify email.'}`);
        }
      } catch (error) {
        setStatus('An error occurred while verifying your email.');
      }
    };

    verifyEmail();
  }, [id, hash, expires, signature, navigate]);

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Verify Email</h2>
        <p>{status || 'Verifying your email, please wait...'}</p>
       
      </div>
    </div>
  );
};

export default VerificationTool;
