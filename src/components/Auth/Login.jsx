import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import GoogleSign from "./GoogleSign";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("log in", user);

        axios
          .post("http://localhost:3000/jwt", { email: user.email })
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("access-token", token);
            navigate(from);
          })
          .catch((err) => {
            console.error("JWT Error:", err.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 rounded-2xl shadow-md p-8">
          {/* Left Section */}
          <div className="flex flex-col justify-center items-center text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">Welcome Back!</h1>
            <p className="text-base-content">Please log in to continue</p>
            <img
              src="https://i.ibb.co.com/dgY6rcV/computer.png"
              alt="Login Illustration"
              className="max-w-sm w-full"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            <form className="w-full space-y-4" onSubmit={handleLogIn}>
              <h2 className="text-2xl font-semibold text-center mb-4 text-base-content">
                Login to your account
              </h2>

              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
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
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
                <label className="label">
                  
                  <Link to="/password-reset" className="link link-hover">
                    Forget Password?
                    </Link>
                </label>
              </div>

              <div className="flex justify-center">
                <button className="btn btn-primary w-full max-w-xs mt-4">
                  Login
                </button>
              </div>
              <div className="flex justify-center">
                <button className="btn btn-primary w-full max-w-xs mt-4">
                 <GoogleSign />
                 
                </button>
              </div>
              <p className="text-xl font-semibold text-center">
                Don't have an account?{" "}
                <Link to={`/Register`}>
                  {" "}
                  <span className="text-blue-300">Register</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
