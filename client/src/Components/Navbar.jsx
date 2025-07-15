import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaBook,
  FaCalendarAlt,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const NavBar = ({ token, logout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "My Notes", path: "/my-notes", icon: <FaBook /> },
    { name: "Courses", path: "/cources", icon: <FaBook /> },
    { name: "Schedule", path: "/schedule", icon: <FaCalendarAlt /> },
  ];

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
      navigate("/");
    }, 500);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-2"
            : "bg-gradient-to-r from-blue-600 to-indigo-700 py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span
                className={`text-xl font-bold ${
                  isScrolled ? "text-indigo-700" : "text-white"
                } flex items-center`}
              >
                <FaBook className="mr-2" />
                StudySync
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {token &&
                navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-3 py-2 rounded-lg flex items-center transition-all ${
                      window.location.pathname === item.path
                        ? isScrolled
                          ? "bg-indigo-100 text-indigo-700 font-semibold"
                          : "bg-white bg-opacity-20 text-white font-semibold"
                        : isScrolled
                        ? "text-gray-600 hover:bg-gray-100"
                        : "text-white hover:bg-white hover:bg-opacity-10"
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </motion.button>
                ))}

              <div className="flex items-center space-x-1 ml-2">
                {token ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-3 py-2 rounded-lg flex items-center ${
                        isScrolled
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                      onClick={handleLogout}
                    >
                      {isLoading ? (
                        <ClipLoader
                          size={18}
                          color={isScrolled ? "#dc2626" : "#ffffff"}
                        />
                      ) : (
                        <>
                          <FaSignOutAlt className="mr-2" />
                          Logout
                        </>
                      )}
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-3 py-2 rounded-lg flex items-center ${
                        isScrolled
                          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          : "bg-white text-blue-600 hover:bg-blue-50"
                      }`}
                      onClick={() => navigate("/register")}
                    >
                      <FaUserPlus className="mr-2" />
                      Register
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-3 py-2 rounded-lg flex items-center ${
                        isScrolled
                          ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                      }`}
                      onClick={() => navigate("/login")}
                    >
                      <FaSignInAlt className="mr-2" />
                      Login
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div
                className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
                  isScrolled ? "bg-white shadow-md" : "bg-indigo-800"
                }`}
              >
                {token ? (
                  <>
                    {navItems.map((item) => (
                      <motion.button
                        key={item.name}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                          window.location.pathname === item.path
                            ? isScrolled
                              ? "bg-indigo-100 text-indigo-700 font-semibold"
                              : "bg-white bg-opacity-20 text-white font-semibold"
                            : isScrolled
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-white hover:bg-indigo-700"
                        }`}
                        onClick={() => {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </motion.button>
                    ))}

                    <div className="border-t border-gray-200 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                          isScrolled
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-white hover:bg-indigo-700"
                        }`}
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <FaUserCircle className="mr-3" />
                        Profile
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                          isScrolled
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        isScrolled
                          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          : "bg-white text-blue-600 hover:bg-blue-50"
                      }`}
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FaUserPlus className="mr-3" />
                      Register
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        isScrolled
                          ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                      }`}
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FaSignInAlt className="mr-3" />
                      Login
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default NavBar;
