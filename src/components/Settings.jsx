import React from 'react';
import Preferences from './Preferences';
import ChangePassword from './ChangePassword';
import VerifyEmail from './VerifyEmail';

const Settings = () => {
  return (
    <div className="p-4 w-full lg:w-[80em] mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      
      {/* Preferences Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Preferences</h3>
        <Preferences />
      </div>

      {/* Change Password Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Change Password</h3>
        <ChangePassword />
      </div>

      {/* Verify Email Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Verify Email</h3>
        <VerifyEmail />
      </div>
    </div>
  );
};

export default Settings;
