import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthContext from "./AuthContext";
import AxiosPublic from "./AxiosPublic";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Registration = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = e.target;

    const firstName = formData.firstName.value;
    const lastName = formData.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    const email = formData.email.value;
    const password = formData.password.value;
    const imageFile = formData.image.files[0];
    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);
    const imgbbApiKey = import.meta.env.VITE_Image_hosting_key;
    const imgbbUploadURL = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const phone = formData.phone.value;
    const address = formData.address.value;
    const institution = formData.institution.value;
    const department = formData.department.value;
    const session = formData.session.value;

    fetch(imgbbUploadURL, {
      method: "POST",
      body: imageFormData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const photoURL = imgResponse.data.url;
          createUser(email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              return updateProfile(user, {
                displayName: fullName,
                photoURL: photoURL,
              });
            })
            .then(() => {
              const userInfo = {
                name: fullName,
                email: email,
                photo: photoURL,
                phone,
                address,
                institution,
                department,
                session,
                role: "student",
              };
              AxiosPublic()
                .post("/users", userInfo)
                .then((res) => {
                  if (res.data.insertedId) {
                    AxiosPublic()
                      .post("/jwt", { email: email })
                      .then((jwtRes) => {
                        const token = jwtRes.data.token;
                        localStorage.setItem("access-token", token);
                        alert("Registration Successful!");
                        navigate("/");
                      })
                      .catch((jwtErr) => {
                        console.error("JWT Error:", jwtErr.message);
                      });
                  }
                });
            })
            .catch((err) => {
              console.error("Firebase error:", err.message);
            });
        }
      })
      .catch((error) => {
        console.error("Image Upload Error:", error.message);
      });
  };

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-base-100 rounded-2xl shadow-md p-8 space-y-5 text-base-content">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer text-base-content"
                onClick={togglePassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="session"
              placeholder="Session"
              className="input input-bordered w-full"
              required
            />

            <button className="btn btn-primary w-full mt-4">Register</button>
            <p className="text-xl font-semibold text-center">
              Already have an account?{" "}
              <Link to={`/Login`}>
                {" "}
                <span className="text-blue-300">Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Registration;
