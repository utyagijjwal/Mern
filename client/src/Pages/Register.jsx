// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaUserGraduate, FaLock, FaEnvelope, FaUser, FaUniversity } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BeatLoader } from 'react-spinners';
// import { useInView } from 'react-intersection-observer';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     institution: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: false });
//   const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: false });
//   const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: false });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     if (!formData.institution.trim()) newErrors.institution = 'Institution is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       toast.success('Registration successful! Welcome to StudyMaster.', {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//       // Reset form
//       setFormData({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         institution: ''
//       });
//     } catch (error) {
//       toast.error('Registration failed. Please try again.', {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer />

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           ref={ref1}
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView1 ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
//             Join <span className="text-indigo-600">StudyMaster</span>
//           </h1>
//           <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
//             Manage your academic journey with our powerful study management tools.
//           </p>
//         </motion.div>

//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//           {/* Form Section */}
//           <motion.div
//             ref={ref2}
//             initial={{ opacity: 0, x: -20 }}
//             animate={inView2 ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="w-full lg:w-1/2"
//           >
//             <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
//               <div className="flex items-center justify-center mb-8">
//                 <div className="bg-indigo-100 p-4 rounded-full">
//                   <FaUserGraduate className="text-indigo-600 text-3xl" />
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaUser className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       className={`block w-full pl-10 pr-3 py-3 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email Address
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaEnvelope className="text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//                       placeholder="you@example.com"
//                     />
//                   </div>
//                   {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
//                     Institution
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaUniversity className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       id="institution"
//                       name="institution"
//                       value={formData.institution}
//                       onChange={handleChange}
//                       className={`block w-full pl-10 pr-3 py-3 border ${errors.institution ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//                       placeholder="University or School"
//                     />
//                   </div>
//                   {errors.institution && <p className="mt-2 text-sm text-red-600">{errors.institution}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaLock className="text-gray-400" />
//                     </div>
//                     <input
//                       type="password"
//                       id="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className={`block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//                       placeholder="••••••••"
//                     />
//                   </div>
//                   {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                     Confirm Password
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaLock className="text-gray-400" />
//                     </div>
//                     <input
//                       type="password"
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className={`block w-full pl-10 pr-3 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//                       placeholder="••••••••"
//                     />
//                   </div>
//                   {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
//                   >
//                     {loading ? (
//                       <BeatLoader color="#ffffff" size={8} />
//                     ) : (
//                       'Create Account'
//                     )}
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-600">
//                   Already have an account?{' '}
//                   <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     Sign in
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Features Section */}
//           <motion.div
//             ref={ref3}
//             initial={{ opacity: 0, x: 20 }}
//             animate={inView3 ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="w-full lg:w-1/2 space-y-8"
//           >
//             <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
//               <h3 className="text-lg font-medium text-gray-900 mb-3">Track Your Progress</h3>
//               <p className="text-gray-600">
//                 Visualize your academic journey with interactive charts and progress tracking.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
//               <h3 className="text-lg font-medium text-gray-900 mb-3">Organize Study Materials</h3>
//               <p className="text-gray-600">
//                 Upload, categorize, and access all your study materials in one centralized location.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
//               <h3 className="text-lg font-medium text-gray-900 mb-3">Collaborate with Peers</h3>
//               <p className="text-gray-600">
//                 Create study groups, share notes, and work together on projects seamlessly.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
//               <h3 className="text-lg font-medium text-gray-900 mb-3">Smart Reminders</h3>
//               <p className="text-gray-600">
//                 Never miss deadlines with our intelligent notification system for assignments and exams.
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BackendURL = import.meta.env.BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    university: "",
    email: "",
    password: "",
  });
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
      const res = await fetch(`${BackendURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.status === 201) {
        navigate("/verify-otp", { state: { email: formData.email } });
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Your Account
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
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              University
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="Enter your university"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
