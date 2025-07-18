import React from 'react';
import UpdateProfilePicture from './UpdateProfilePicture';

const Settings = () => {
  return (
    <div className="p-6 pt-24 bg-base-100 min-h-screen text-base-content">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <UpdateProfilePicture />
    </div>
  );
};

export default Settings;
