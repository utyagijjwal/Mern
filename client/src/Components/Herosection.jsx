import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaUserGraduate, FaChalkboardTeacher, FaSearch, FaArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const navigate = useNavigate();

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.warn('Please enter a search term', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true);
    toast.info(`Searching for "${searchQuery}"`, {
      position: 'top-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      toast.success(`Showing results for "${searchQuery}"`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }, 2000);
  };

  const stats = [
    { value: '10,000+', label: 'Active Students', icon: <FaUserGraduate className="text-blue-500" /> },
    { value: '500+', label: 'Courses', icon: <FaBookOpen className="text-indigo-500" /> },
    { value: '200+', label: 'Expert Instructors', icon: <FaChalkboardTeacher className="text-purple-500" /> },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Master Your</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                Study Journey
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              The ultimate platform to organize, track, and enhance your learning experience with personalized tools and resources.
            </p>

            {/* Search bar */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative max-w-md mx-auto md:mx-0 mb-10"
            >
              <div className="flex shadow-lg rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, subjects..."
                  className="flex-grow px-5 py-4 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 flex items-center justify-center transition-colors"
                >
                  {isLoading ? (
                    <PulseLoader size={8} color="white" />
                  ) : (
                    <FaSearch className="text-xl" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3"
                >
                  <div className="text-2xl">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
              
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative"
              >
                <img 
                  src="https://illustrations.popsy.co/amber/student-graduation.svg" 
                  alt="Student learning illustration"
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {scrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-indigo-600 cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-sm mb-1">Explore More</span>
              <FaArrowDown className="text-xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;