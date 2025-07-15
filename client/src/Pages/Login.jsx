// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaUserGraduate,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaSignInAlt,
//   FaGoogle,
//   FaGithub,
//   FaFacebook
// } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { PulseLoader } from 'react-spinners';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();

//   // Scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       toast.warn('Please fill in all fields', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       return;
//     }

//     setLoading(true);

//     // Simulate API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // In a real app, you would handle authentication here
//       toast.success('Login successful!', {
//         position: 'top-right',
//         autoClose: 2000,
//       });

//       // Redirect to dashboard after successful login
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2000);
//     } catch (error) {
//       toast.error('Invalid credentials. Please try again.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const socialLogin = (provider) => {
//     toast.info(`Logging in with ${provider}...`, {
//       position: 'top-right',
//       autoClose: 2000,
//     });
//     // In a real app, you would implement OAuth here
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}
//       >
//         {/* Header content can go here */}
//       </motion.header>

//       {/* Spacer for header */}
//       <div className="h-24"></div>

//       {/* Main Content */}
//       <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md space-y-8"
//         >
//           <div className="text-center">
//             <motion.div
//               initial={{ rotateY: 0 }}
//               animate={{ rotateY: 360 }}
//               transition={{ duration: 1.5, delay: 0.5 }}
//               className="mx-auto h-24 w-24 rounded-full bg-white shadow-md flex items-center justify-center mb-4"
//             >
//               <FaUserGraduate className="text-indigo-600 text-4xl" />
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-3xl font-extrabold text-gray-900"
//             >
//               Welcome back
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="mt-2 text-sm text-gray-600"
//             >
//               Sign in to access your study dashboard
//             </motion.p>
//           </div>

//           {/* Login Form */}
//           <motion.form
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="mt-8 space-y-6"
//             onSubmit={handleSubmit}
//           >
//             <div className="rounded-md shadow-sm space-y-4">
//               {/* Email Field */}
//               <motion.div
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//               >
//                 <label htmlFor="email" className="sr-only">Email address</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaUserGraduate className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="py-3 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border"
//                     placeholder="Email address"
//                   />
//                 </div>
//               </motion.div>

//               {/* Password Field */}
//               <motion.div
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//               >
//                 <label htmlFor="password" className="sr-only">Password</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="py-3 pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border pr-10"
//                     placeholder="Password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     ) : (
//                       <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <Link
//                   to="/forgot-password"
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>
//             </div>

//             <div>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//               >
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   {loading ? (
//                     <PulseLoader size={8} color="white" />
//                   ) : (
//                     <FaSignInAlt className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
//                   )}
//                 </span>
//                 {loading ? 'Signing in...' : 'Sign in'}
//               </motion.button>
//             </div>
//           </motion.form>

//           {/* Social Login */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//             className="mt-6"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-500">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-3 gap-3">
//               <motion.button
//                 whileHover={{ y: -3 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => socialLogin('Google')}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//               >
//                 <FaGoogle className="h-5 w-5 text-red-500" />
//               </motion.button>

//               <motion.button
//                 whileHover={{ y: -3 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => socialLogin('GitHub')}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//               >
//                 <FaGithub className="h-5 w-5 text-gray-800" />
//               </motion.button>

//               <motion.button
//                 whileHover={{ y: -3 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => socialLogin('Facebook')}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//               >
//                 <FaFacebook className="h-5 w-5 text-blue-600" />
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Sign Up Link */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 1 }}
//             className="text-center text-sm text-gray-600"
//           >
//             <p>
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status === 200) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
