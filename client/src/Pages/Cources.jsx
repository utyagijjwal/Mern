import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaBookOpen, 
  FaClock, 
  FaUserGraduate, 
  FaStar, 
  FaArrowRight,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);

  // Categories for filtering
  const categories = [
    'All',
    'Computer Science',
    'Business',
    'Engineering',
    'Health',
    'Humanities',
    'Mathematics'
  ];

  // Difficulty levels
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  // Simulate fetching courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data with prices
        const mockCourses = [
          // Computer Science
          {
            id: 1,
            title: 'Introduction to Computer Science',
            instructor: 'Dr. Sarah Johnson',
            duration: '8 weeks',
            students: 1250,
            rating: 4.8,
            category: 'Computer Science',
            difficulty: 'Beginner',
            image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Learn the fundamentals of computer science and programming.',
            price: 99.99,
            originalPrice: 149.99
          },
          {
            id: 2,
            title: 'Advanced Algorithms',
            instructor: 'Prof. Michael Chen',
            duration: '12 weeks',
            students: 850,
            rating: 4.9,
            category: 'Computer Science',
            difficulty: 'Advanced',
            image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Master complex algorithms and data structures for technical interviews.',
            price: 149.99,
            originalPrice: 199.99
          },
          {
            id: 3,
            title: 'Web Development Bootcamp',
            instructor: 'Alex Rivera',
            duration: '10 weeks',
            students: 3200,
            rating: 4.7,
            category: 'Computer Science',
            difficulty: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Full-stack web development with modern frameworks and tools.',
            price: 129.99,
            originalPrice: 179.99
          },

          // Business
          {
            id: 4,
            title: 'Business Fundamentals',
            instructor: 'Dr. Emily Wilson',
            duration: '6 weeks',
            students: 1800,
            rating: 4.6,
            category: 'Business',
            difficulty: 'Beginner',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Essential concepts for starting and managing a successful business.',
            price: 89.99,
            originalPrice: 129.99
          },
          {
            id: 5,
            title: 'Digital Marketing Strategy',
            instructor: 'Jamie Smith',
            duration: '8 weeks',
            students: 2100,
            rating: 4.5,
            category: 'Business',
            difficulty: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Learn to create effective digital marketing campaigns across platforms.',
            price: 109.99,
            originalPrice: 149.99
          },
          {
            id: 6,
            title: 'Financial Analysis',
            instructor: 'Robert Kim',
            duration: '10 weeks',
            students: 950,
            rating: 4.7,
            category: 'Business',
            difficulty: 'Advanced',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Advanced techniques for financial statement analysis and valuation.',
            price: 139.99,
            originalPrice: 189.99
          },

          // Engineering
          {
            id: 7,
            title: 'Mechanical Engineering Principles',
            instructor: 'Dr. James Peterson',
            duration: '12 weeks',
            students: 1100,
            rating: 4.6,
            category: 'Engineering',
            difficulty: 'Intermediate',
            image: 'https://www.goconstruct.org/media/jtshfzfk/plant-mechanical-engineer-ss2456101169.jpg?width=510&height=332&format=WebP&quality=75&v=1db893e1accd210',
            description: 'Core concepts of mechanical engineering and machine design.',
            price: 119.99,
            originalPrice: 159.99
          },
          {
            id: 8,
            title: 'Electrical Circuits',
            instructor: 'Dr. Lisa Wong',
            duration: '8 weeks',
            students: 750,
            rating: 4.4,
            category: 'Engineering',
            difficulty: 'Beginner',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Introduction to electrical circuit theory and analysis.',
            price: 99.99,
            originalPrice: 139.99
          },
          {
            id: 9,
            title: 'Civil Engineering Projects',
            instructor: 'Prof. David Miller',
            duration: '14 weeks',
            students: 600,
            rating: 4.8,
            category: 'Engineering',
            difficulty: 'Advanced',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Planning and execution of large-scale civil engineering projects.',
            price: 149.99,
            originalPrice: 199.99
          },

          // Health
          {
            id: 10,
            title: 'Nutrition Science',
            instructor: 'Dr. Olivia Harris',
            duration: '6 weeks',
            students: 2500,
            rating: 4.7,
            category: 'Health',
            difficulty: 'Beginner',
            image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Evidence-based approach to nutrition and healthy eating habits.',
            price: 79.99,
            originalPrice: 119.99
          },
          {
            id: 11,
            title: 'Public Health Essentials',
            instructor: 'Dr. Mark Taylor',
            duration: '8 weeks',
            students: 1200,
            rating: 4.5,
            category: 'Health',
            difficulty: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Fundamentals of public health policy and community health.',
            price: 99.99,
            originalPrice: 139.99
          },
          {
            id: 12,
            title: 'Medical Neuroscience',
            instructor: 'Dr. Rachel Adams',
            duration: '12 weeks',
            students: 800,
            rating: 4.9,
            category: 'Health',
            difficulty: 'Advanced',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Comprehensive study of the human nervous system and brain function.',
            price: 129.99,
            originalPrice: 179.99
          },

          // Humanities
          {
            id: 13,
            title: 'Introduction to Philosophy',
            instructor: 'Prof. Thomas Brown',
            duration: '6 weeks',
            students: 1800,
            rating: 4.6,
            category: 'Humanities',
            difficulty: 'Beginner',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Explore major philosophical questions and thinkers throughout history.',
            price: 69.99,
            originalPrice: 99.99
          },
          {
            id: 14,
            title: 'World Literature',
            instructor: 'Dr. Sophia Lee',
            duration: '10 weeks',
            students: 950,
            rating: 4.4,
            category: 'Humanities',
            difficulty: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Survey of significant literary works from around the world.',
            price: 89.99,
            originalPrice: 129.99
          },
          {
            id: 15,
            title: 'Art History: Renaissance to Modern',
            instructor: 'Prof. Daniel White',
            duration: '12 weeks',
            students: 700,
            rating: 4.8,
            category: 'Humanities',
            difficulty: 'Advanced',
            image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'In-depth study of art movements from the Renaissance to contemporary times.',
            price: 109.99,
            originalPrice: 149.99
          },

          // Mathematics
          {
            id: 16,
            title: 'Calculus I',
            instructor: 'Dr. Richard Moore',
            duration: '10 weeks',
            students: 2000,
            rating: 4.5,
            category: 'Mathematics',
            difficulty: 'Beginner',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Introduction to differential and integral calculus with applications.',
            price: 99.99,
            originalPrice: 139.99
          },
          {
            id: 17,
            title: 'Linear Algebra',
            instructor: 'Dr. Patricia Clark',
            duration: '8 weeks',
            students: 1200,
            rating: 4.7,
            category: 'Mathematics',
            difficulty: 'Intermediate',
            image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Vectors, matrices, and linear transformations with practical applications.',
            price: 109.99,
            originalPrice: 149.99
          },
          {
            id: 18,
            title: 'Probability and Statistics',
            instructor: 'Prof. Kevin Johnson',
            duration: '12 weeks',
            students: 900,
            rating: 4.6,
            category: 'Mathematics',
            difficulty: 'Advanced',
            image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Advanced concepts in probability theory and statistical analysis.',
            price: 119.99,
            originalPrice: 159.99
          }
        ];

        setCourses(mockCourses);
        toast.success('Courses loaded successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Failed to load courses', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId) => {
    setLoading(true);
    toast.info('Processing enrollment...', {
      position: 'top-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      setLoading(false);
      toast.success('Successfully enrolled in course!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white transition-all duration-300 style="opacity:1;"`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Courses
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover the perfect course to advance your knowledge and skills
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-12 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Search Bar */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative flex-grow max-w-2xl"
            >
              <div className="flex shadow-md rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses or instructors..."
                  className="flex-grow px-5 py-4 focus:outline-none"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 flex items-center justify-center transition-colors">
                  <FaSearch className="text-xl" />
                </button>
              </div>
            </motion.div>

            {/* Filters Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              <FaFilter />
              <span>Filters</span>
              {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
            </motion.button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner"
              >
                <h3 className="text-lg font-semibold mb-4">Filter Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium mb-2">Category</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-2 rounded-md text-sm ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <h4 className="font-medium mb-2">Difficulty</h4>
                    <div className="flex flex-wrap gap-2">
                      {difficultyLevels.map(level => (
                        <motion.button
                          key={level}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-3 py-2 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-100"
                        >
                          {level}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <div className="flex items-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchTerm('');
                      }}
                      className="px-4 py-2 rounded-md text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Reset Filters
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Courses Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <PulseLoader color="#6366f1" size={20} />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'All' ? 'All Courses' : selectedCategory}
                </h2>
                <p className="text-gray-600">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </p>
              </div>

              {filteredCourses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                            {course.category}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                            {course.difficulty}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <FaUserGraduate className="mr-1" />
                          <span className="mr-4">{course.students.toLocaleString()} students</span>
                          <FaClock className="mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                          <span className="text-gray-500">By {course.instructor}</span>
                        </div>
                        
                        {/* Price Display */}
                        <div className="flex items-center mb-4">
                          {course.originalPrice && (
                            <span className="text-sm text-gray-500 line-through mr-2">
                              ${course.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-indigo-600">
                            ${course.price.toFixed(2)}
                          </span>
                          {course.originalPrice && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                            </span>
                          )}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleEnroll(course.id)}
                          disabled={loading}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                        >
                          {loading ? (
                            <PulseLoader size={8} color="white" />
                          ) : (
                            <>
                              Enroll Now <FaArrowRight className="ml-2" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;