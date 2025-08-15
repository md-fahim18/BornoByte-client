


// import React, { useContext, useState, useEffect } from 'react';
// import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
// import useAxiosSecure from '../../Auth/useAxiosSecure';
// import AuthContext from '../../Auth/AuthContext';

// const UpdateProfilePicture = () => {
//   const { user } = useContext(AuthContext);
//   const [axiosSecure] = useAxiosSecure();
//   const [imageFile, setImageFile] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [uploading, setUploading] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [passwordErrors, setPasswordErrors] = useState({});

//   // Initialize form with user data
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.displayName || '',
//         email: user.email || '',
//       });
//     }
//   }, [user]);

//   const imgbbApiKey = import.meta.env.VITE_Image_hosting_key;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     if (passwordErrors[name]) {
//       setPasswordErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validatePasswordForm = () => {
//     const newErrors = {};
    
//     if (!passwordData.currentPassword) {
//       newErrors.currentPassword = 'Current password is required';
//     }
    
//     if (!passwordData.newPassword) {
//       newErrors.newPassword = 'New password is required';
//     } else if (passwordData.newPassword.length < 6) {
//       newErrors.newPassword = 'Password must be at least 6 characters';
//     }
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     setPasswordErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (!user) return;
    
//     setUploading(true);

//     try {
//       const oldEmail = user.email; // Store original email
//       let photoURL = user.photoURL;
      
//       // 1. Upload new image if provided
//       if (imageFile) {
//         const formData = new FormData();
//         formData.append("image", imageFile);

//         const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await res.json();
//         photoURL = data.data.url;
//       }

//       // 2. Prepare Firebase updates
//       const updates = {};
//       if (formData.name !== user.displayName) updates.displayName = formData.name;
//       if (photoURL !== user.photoURL) updates.photoURL = photoURL;
      
//       // 3. Update Firebase profile
//       if (Object.keys(updates).length > 0) {
//         await updateProfile(user, updates);
//       }

//       // 4. Update email if changed
//       if (formData.email !== user.email) {
//         await updateEmail(user, formData.email);
//       }

//       // 5. Update MongoDB - use original email for lookup
//       await axiosSecure.patch(`/users/${oldEmail}`, {
//         name: formData.name,
//         email: formData.email,
//         photo: photoURL
//       });

//       // 6. Reload user using Firebase method
//       await user.reload();
      
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Profile update failed:", error);
//       let errorMsg = error.message;
      
//       if (error.code === 'auth/requires-recent-login') {
//         errorMsg = 'Security sensitive operation - please reauthenticate';
//       } else if (error.code === 'auth/email-already-in-use') {
//         errorMsg = 'Email already in use by another account';
//       }
      
//       alert(`Profile update failed: ${errorMsg}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     if (!validatePasswordForm()) return;
//     if (!user) return;
    
//     setChangingPassword(true);

//     try {
//       // Reauthenticate user
//       const credential = EmailAuthProvider.credential(
//         user.email, 
//         passwordData.currentPassword
//       );
      
//       await reauthenticateWithCredential(user, credential);
      
//       // Update password
//       await updatePassword(user, passwordData.newPassword);
      
//       // Clear password form
//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
      
//       alert("Password changed successfully!");
//     } catch (error) {
//       console.error("Password change failed:", error);
//       let errorMsg = error.message;
      
//       if (error.code === 'auth/wrong-password') {
//         errorMsg = 'Current password is incorrect';
//       } else if (error.code === 'auth/requires-recent-login') {
//         errorMsg = 'Security sensitive operation - please reauthenticate';
//       } else if (error.code === 'auth/weak-password') {
//         errorMsg = 'Password should be at least 6 characters';
//       }
      
//       alert(`Password change failed: ${errorMsg}`);
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
      
//       {/* Profile Update Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         {/* Name Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//         </div>

//         {/* Email Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//         </div>

//         {/* Profile Picture */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Profile Picture</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full file-input file-input-bordered"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Leave empty to keep current photo
//           </p>
//         </div>

//         {/* Current Photo Preview */}
//         {user?.photoURL && !imageFile && (
//           <div className="flex items-center space-x-4">
//             <span className="text-sm">Current Photo:</span>
//             <img 
//               src={user.photoURL} 
//               alt="Current profile" 
//               className="w-12 h-12 rounded-full object-cover"
//             />
//           </div>
//         )}

//         {/* New Photo Preview */}
//         {imageFile && (
//           <div className="flex items-center space-x-4">
//             <span className="text-sm">New Photo:</span>
//             <img 
//               src={URL.createObjectURL(imageFile)} 
//               alt="Preview" 
//               className="w-12 h-12 rounded-full object-cover"
//             />
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//           disabled={uploading}
//         >
//           {uploading ? "Updating Profile..." : "Update Profile"}
//         </button>
//       </form>
      
//       {/* Password Change Form */}
//       <div className="border-t pt-6">
//         <h3 className="text-xl font-semibold mb-4">Change Password</h3>
//         <form onSubmit={handlePasswordSubmit} className="space-y-4">
//           {/* Current Password */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Current Password</label>
//             <input
//               type="password"
//               name="currentPassword"
//               value={passwordData.currentPassword}
//               onChange={handlePasswordChange}
//               className={`w-full p-2 border rounded ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {passwordErrors.currentPassword && (
//               <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>
//             )}
//           </div>
          
//           {/* New Password */}
//           <div>
//             <label className="block text-sm font-medium mb-1">New Password</label>
//             <input
//               type="password"
//               name="newPassword"
//               value={passwordData.newPassword}
//               onChange={handlePasswordChange}
//               className={`w-full p-2 border rounded ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {passwordErrors.newPassword && (
//               <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>
//             )}
//           </div>
          
//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Confirm New Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={passwordData.confirmPassword}
//               onChange={handlePasswordChange}
//               className={`w-full p-2 border rounded ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {passwordErrors.confirmPassword && (
//               <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>
//             )}
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition disabled:opacity-50"
//             disabled={changingPassword}
//           >
//             {changingPassword ? "Changing Password..." : "Change Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfilePicture; v
import React, { useContext, useState, useEffect } from 'react';
import {
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  getAuth
} from "firebase/auth";
import useAxiosSecure from '../../Auth/useAxiosSecure';
import AuthContext from '../../Auth/AuthContext';

const UpdateProfilePicture = () => {
  const { user: appUser } = useContext(AuthContext); // your app's user info
  const auth = getAuth();
  const firebaseUser = auth.currentUser; // actual Firebase user object

  const [axiosSecure] = useAxiosSecure();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [uploading, setUploading] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  // Initialize form with appUser data
  useEffect(() => {
    if (appUser) {
      setFormData({
        name: appUser.displayName || '',
        email: appUser.email || '',
      });
    }
  }, [appUser]);

  const imgbbApiKey = import.meta.env.VITE_Image_hosting_key;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) setPasswordErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!firebaseUser) return;

    setUploading(true);

    try {
      const oldEmail = firebaseUser.email;
      let photoURL = firebaseUser.photoURL;

      // Upload image if provided
      if (imageFile) {
        const imgForm = new FormData();
        imgForm.append("image", imageFile);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: 'POST',
          body: imgForm,
        });
        const data = await res.json();
        photoURL = data.data.url;
      }

      // Prepare updates
      const updates = {};
      if (formData.name !== firebaseUser.displayName) updates.displayName = formData.name;
      if (photoURL !== firebaseUser.photoURL) updates.photoURL = photoURL;

      // Update Firebase profile
      if (Object.keys(updates).length > 0) {
        await updateProfile(firebaseUser, updates);
      }

      // Update email if changed
      if (formData.email !== firebaseUser.email) {
        await updateEmail(firebaseUser, formData.email);
      }

      // Update MongoDB
      await axiosSecure.patch(`/users/${oldEmail}`, {
        name: formData.name,
        email: formData.email,
        photo: photoURL
      });

      // Reload Firebase user
      await firebaseUser.reload();

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      let errorMsg = error.message;
      if (error.code === 'auth/requires-recent-login') {
        errorMsg = 'Security sensitive operation - please reauthenticate';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Email already in use by another account';
      }
      alert(`Profile update failed: ${errorMsg}`);
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
    if (!firebaseUser) return;

    setChangingPassword(true);

    try {
      const credential = EmailAuthProvider.credential(
        firebaseUser.email,
        passwordData.currentPassword
      );
      await reauthenticateWithCredential(firebaseUser, credential);
      await updatePassword(firebaseUser, passwordData.newPassword);

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      alert("Password changed successfully!");
    } catch (error) {
      console.error("Password change failed:", error);
      let errorMsg = error.message;
      if (error.code === 'auth/wrong-password') {
        errorMsg = 'Current password is incorrect';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMsg = 'Security sensitive operation - please reauthenticate';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Password should be at least 6 characters';
      }
      alert(`Password change failed: ${errorMsg}`);
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

      {/* Profile Update Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full file-input file-input-bordered"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to keep current photo</p>
        </div>

        {/* Current Photo */}
        {firebaseUser?.photoURL && !imageFile && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Current Photo:</span>
            <img
              src={firebaseUser.photoURL}
              alt="Current profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}

        {/* New Photo Preview */}
        {imageFile && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">New Photo:</span>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Updating Profile..." : "Update Profile"}
        </button>
      </form>

      {/* Change Password */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className={`w-full p-2 border rounded ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {passwordErrors.currentPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className={`w-full p-2 border rounded ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {passwordErrors.newPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className={`w-full p-2 border rounded ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {passwordErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition disabled:opacity-50"
            disabled={changingPassword}
          >
            {changingPassword ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
