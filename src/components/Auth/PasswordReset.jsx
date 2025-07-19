import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2'; // Optional, but gives nice popup
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire('Oops!', 'Please enter your email.', 'warning');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire('Success!', 'Password reset email sent. Please check your inbox.', 'success');
        setEmail('');
        navigate('/login'); // Redirect to login after sending reset email

      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire('Error!', error.message, 'error');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">Send Reset Email</button>
      </form>
    </div>
  );
};

export default PasswordReset;
