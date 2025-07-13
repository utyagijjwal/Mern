// import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaHome,
//   FaBook,
//   FaCalendarAlt,
//   FaChartLine,
//   FaUserGraduate,
//   FaSignInAlt,
//   FaUserPlus,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
//   FaUserCircle
// } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ClipLoader } from 'react-spinners';
// import { useNavigate, useLocation } from 'react-router-dom';

// const StudyNavbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showAuthDropdown, setShowAuthDropdown] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle login simulation
//   const handleLogin = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoggedIn(true);
//       setIsLoading(false);
//       setMobileMenuOpen(false);
//       toast.success('Welcome back!', {
//         position: "top-right",
//         icon: <FaUserGraduate />,
//         theme: "colored"
//       });
//       navigate('/dashboard');
//     }, 800);
//   };

//   // Handle registration simulation
//   const handleRegister = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setMobileMenuOpen(false);
//       toast.info('Registration page loading', {
//         position: "top-right",
//         theme: "colored"
//       });
//       navigate('/register');
//     }, 600);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoggedIn(false);
//       setIsLoading(false);
//       toast.success('Logged out successfully', {
//         position: "top-right",
//         icon: <FaSignOutAlt />,
//         theme: "colored"
//       });
//       navigate('/');
//     }, 500);
//   };

//   const navItems = [
//     { name: 'Dashboard', path: '/', icon: <FaHome className="text-lg" /> },
//     { name: 'Courses', path: '/cources', icon: <FaBook className="text-lg" /> },
//     { name: 'Schedule', path: '/schedule', icon: <FaCalendarAlt className="text-lg" /> },
//     { name: 'Progress', path: '/progress', icon: <FaChartLine className="text-lg" /> },
//     { name: 'Login', path: '/login', icon: <FaSignInAlt className="text-sm" /> },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-gradient-to-r from-blue-600 to-indigo-700 py-3'}`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex-shrink-0 flex items-center cursor-pointer"
//               onClick={() => navigate('/')}
//             >
//               <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-700' : 'text-white'} flex items-center`}>
//                 <FaBook className="mr-2" />
//                 <span className="hidden sm:inline">Study</span>Master
//               </span>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-2">
//               {navItems.filter(item => isLoggedIn ? item.name !== 'Login/Signup' : true).map((item) => (
//                 <motion.button
//                   key={item.name}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   className={`px-4 py-2 rounded-lg flex items-center transition-all ${
//                     isActive(item.path)
//                       ? (isScrolled
//                           ? 'bg-indigo-100 text-indigo-700 font-semibold'
//                           : 'bg-white bg-opacity-20 text-white font-semibold')
//                       : (isScrolled
//                           ? 'text-gray-600 hover:bg-gray-100'
//                           : 'text-white hover:bg-white hover:bg-opacity-10')
//                   }`}
//                   onClick={() => {
//                     if (item.name === 'Login/Signup') {
//                       setShowAuthDropdown(!showAuthDropdown);
//                     } else {
//                       navigate(item.path);
//                     }
//                   }}
//                 >
//                   <span className="mr-2">{item.icon}</span>
//                   {item.name}
//                 </motion.button>
//               ))}

//               {isLoggedIn && (
//                 <>
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     className={`px-4 py-2 rounded-lg flex items-center ${
//                       isActive('/profile')
//                         ? (isScrolled
//                             ? 'bg-indigo-100 text-indigo-700 font-semibold'
//                             : 'bg-white bg-opacity-20 text-white font-semibold')
//                         : (isScrolled
//                             ? 'text-gray-600 hover:bg-gray-100'
//                             : 'text-white hover:bg-white hover:bg-opacity-10')
//                     }`}
//                     onClick={() => navigate('/profile')}
//                   >
//                     <FaUserCircle className="mr-2 text-lg" />
//                     Profile
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     className={`px-4 py-2 rounded-lg flex items-center ${
//                       isScrolled
//                         ? 'bg-red-100 text-red-600 hover:bg-red-200'
//                         : 'bg-red-500 text-white hover:bg-red-600'
//                     }`}
//                     onClick={handleLogout}
//                   >
//                     {isLoading ? (
//                       <ClipLoader size={18} color={isScrolled ? "#dc2626" : "#ffffff"} />
//                     ) : (
//                       <>
//                         <FaSignOutAlt className="mr-2 text-lg" />
//                         Logout
//                       </>
//                     )}
//                   </motion.button>
//                 </>
//               )}

//               <AnimatePresence>
//                 {showAuthDropdown && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className={`absolute right-4 mt-12 w-48 rounded-md shadow-lg py-1 z-50 ${
//                       isScrolled ? 'bg-white' : 'bg-indigo-800'
//                     }`}
//                   >
//                     <button
//                       className={`block w-full text-left px-4 py-2 text-sm ${
//                         isScrolled
//                           ? 'text-gray-700 hover:bg-indigo-100'
//                           : 'text-white hover:bg-indigo-700'
//                       }`}
//                       onClick={() => {
//                         handleLogin();
//                         setShowAuthDropdown(false);
//                       }}
//                     >
//                       Login
//                     </button>
//                     <button
//                       className={`block w-full text-left px-4 py-2 text-sm ${
//                         isScrolled
//                           ? 'text-gray-700 hover:bg-indigo-100'
//                           : 'text-white hover:bg-indigo-700'
//                       }`}
//                       onClick={() => {
//                         handleRegister();
//                         setShowAuthDropdown(false);
//                       }}
//                     >
//                       Sign Up
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 className={`inline-flex items-center justify-center p-2 rounded-md ${
//                   isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-10'
//                 }`}
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 aria-label="Toggle menu"
//               >
//                 {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//               </motion.button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden overflow-hidden"
//             >
//               <div className={`px-2 pt-2 pb-3 space-y-2 sm:px-3 ${
//                 isScrolled ? 'bg-white shadow-md' : 'bg-indigo-800'
//               }`}>
//                 {navItems.filter(item => isLoggedIn ? item.name !== 'Login/Signup' : true).map((item) => (
//                   <motion.button
//                     key={item.name}
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.99 }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
//                       isActive(item.path)
//                         ? (isScrolled
//                             ? 'bg-indigo-100 text-indigo-700 font-semibold'
//                             : 'bg-white bg-opacity-20 text-white font-semibold')
//                         : (isScrolled
//                             ? 'text-gray-700 hover:bg-gray-100'
//                             : 'text-white hover:bg-indigo-700')
//                     }`}
//                     onClick={() => {
//                       if (item.name === 'Login/Signup') {
//                         handleLogin();
//                       } else {
//                         navigate(item.path);
//                       }
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     <span className="mr-3">{item.icon}</span>
//                     {item.name}
//                   </motion.button>
//                 ))}

//                 {isLoggedIn && (
//                   <div className="border-t border-gray-200 pt-2">
//                     <motion.button
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.99 }}
//                       className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
//                         isActive('/profile')
//                           ? (isScrolled
//                               ? 'bg-indigo-100 text-indigo-700 font-semibold'
//                               : 'bg-white bg-opacity-20 text-white font-semibold')
//                           : (isScrolled
//                               ? 'text-gray-700 hover:bg-gray-100'
//                               : 'text-white hover:bg-indigo-700')
//                       }`}
//                       onClick={() => {
//                         navigate('/profile');
//                         setMobileMenuOpen(false);
//                       }}
//                     >
//                       <FaUserCircle className="mr-3 text-lg" />
//                       Profile
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.99 }}
//                       className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
//                         isScrolled
//                           ? 'bg-red-100 text-red-600 hover:bg-red-200'
//                           : 'bg-red-500 text-white hover:bg-red-600'
//                       }`}
//                       onClick={() => {
//                         handleLogout();
//                         setMobileMenuOpen(false);
//                       }}
//                     >
//                       <FaSignOutAlt className="mr-3 text-lg" />
//                       Logout
//                     </motion.button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Spacer to prevent content from being hidden behind fixed navbar */}
//       <div className="h-20"></div>
//     </>
//   );
// };

// export default StudyNavbar;

const { Link } = ReactRouterDOM;

const NavBar = ({ token, logout }) => {
  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          StudySync
        </Link>
        <div className="space-x-6 flex items-center">
          {!token ? (
            <>
              <Link to="/" className="text-lg hover:text-blue-200 transition">
                Register
              </Link>
              <Link
                to="/login"
                className="text-lg hover:text-blue-200 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-lg hover:text-blue-200 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-lg hover:text-blue-200 transition focus:outline-none"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
