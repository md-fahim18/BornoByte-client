import React, { useContext, useState } from 'react';
import { updateProfile } from "firebase/auth";

import useAxiosSecure from '../../Auth/useAxiosSecure';
import AuthContext from '../../Auth/AuthContext';

const UpdateProfilePicture = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const imgbbApiKey = import.meta.env.VITE_Image_hosting_key;

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!imageFile) return alert("Please select an image.");

    setUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // 1. Upload to imgbb
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      const imageUrl = data.data.url;

      // 2. Update Firebase
      await updateProfile(user, {
        photoURL: imageUrl,
      });

      // 3. Update MongoDB user document
      await axiosSecure.patch(`/users/${user.email}`, {
        photo: imageUrl,
      });

      alert("Profile picture updated!");
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("Update failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      <button
        className="btn btn-primary"
        onClick={handleUpdate}
        disabled={uploading}
      >
        {uploading ? "Updating..." : "Update Profile Picture"}
      </button>
    </div>
  );
};

export default UpdateProfilePicture;
