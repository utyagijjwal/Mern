import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaTrophy,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetHours: '',
    deadline: '',
    course: ''
  });

  // Sample courses
  const courses = [
    'Computer Science 101',
    'Mathematics Advanced',
    'Literature Survey',
    'Physics Fundamentals',
    'History of Science'
  ];

  // Simulate fetching progress data
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - in a real app, you would fetch from an API
        const mockData = {
          overview: {
            totalHours: 156,
            completedCourses: 8,
            currentStreak: 14,
            weeklyProgress: [
              { day: 'Mon', hours: 3.5 },
              { day: 'Tue', hours: 4.2 },
              { day: 'Wed', hours: 2.8 },
              { day: 'Thu', hours: 5.1 },
              { day: 'Fri', hours: 3.7 },
              { day: 'Sat', hours: 2.0 },
              { day: 'Sun', hours: 1.5 }
            ],
            courseProgress: [
              { name: 'CS101', progress: 75 },
              { name: 'Math', progress: 60 },
              { name: 'Physics', progress: 45 },
              { name: 'History', progress: 30 },
              { name: 'Literature', progress: 90 }
            ]
          },
          goals: [
            {
              id: 1,
              title: 'Complete CS101 assignments',
              course: 'Computer Science 101',
              targetHours: 20,
              completedHours: 15,
              deadline: '2023-12-15',
              progress: 75
            },
            {
              id: 2,
              title: 'Study for Math midterm',
              course: 'Mathematics Advanced',
              targetHours: 30,
              completedHours: 18,
              deadline: '2023-12-20',
              progress: 60
            }
          ],
          history: [
            {
              id: 1,
              date: '2023-11-01',
              course: 'Computer Science 101',
              hours: 3.5,
              achievement: 'Completed Chapter 3'
            },
            // More history items...
          ]
        };

        setProgressData(mockData);
        toast.success('Progress data loaded successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Failed to load progress data', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetHours || !newGoal.deadline || !newGoal.course) {
      toast.warn('Please fill all required fields', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    toast.info('Adding new goal...', {
      position: 'top-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      const progressPercentage = Math.floor(Math.random() * 30); // Simulate some progress
     const newGoalObj = {
  id: progressData.goals.length + 1,
  ...newGoal,
  completedHours: Math.floor(parseInt(newGoal.targetHours) * (progressPercentage / 100)),
  progress: progressPercentage
};

      setProgressData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoalObj]
      }));
      setNewGoal({
        title: '',
        targetHours: '',
        deadline: '',
        course: ''
      });
      setShowAddGoal(false);
      setLoading(false);
      toast.success('Goal added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }, 1500);
  };

  const handleDeleteGoal = (id) => {
    setLoading(true);
    toast.info('Deleting goal...', {
      position: 'top-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      setProgressData(prev => ({
        ...prev,
        goals: prev.goals.filter(goal => goal.id !== id)
      }));
      setLoading(false);
      toast.success('Goal deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white transition-all duration-300 ${scrolled ? 'pt-24' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Learning Progress
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Track your achievements and stay motivated on your learning journey
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Progress Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="flex border-b border-gray-200">
              {['overview', 'goals', 'history'].map(tab => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-center font-medium capitalize ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <PulseLoader color="#10b981" size={20} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600"
                      >
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                            <FaClock className="text-xl" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Study Hours</h3>
                            <p className="text-2xl font-bold text-gray-900">{progressData.overview.totalHours}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500"
                      >
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                            <FaCheckCircle className="text-xl" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Completed Courses</h3>
                            <p className="text-2xl font-bold text-gray-900">{progressData.overview.completedCourses}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500"
                      >
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                            <FaTrophy className="text-xl" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Current Streak</h3>
                            <p className="text-2xl font-bold text-gray-900">{progressData.overview.currentStreak} days</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Weekly Progress Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaCalendarAlt className="mr-2 text-green-600" />
                        Weekly Study Hours
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={progressData.overview.weeklyProgress}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Course Progress */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaBook className="mr-2 text-green-600" />
                        Course Progress
                      </h3>
                      <div className="space-y-4">
                        {progressData.overview.courseProgress.map((course, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{course.name}</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Goals Tab */}
                {activeTab === 'goals' && (
                  <div className="space-y-6">
                    {/* Add Goal Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddGoal(!showAddGoal)}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg"
                      >
                        <FaPlus />
                        <span>Add New Goal</span>
                      </motion.button>
                    </motion.div>

                    {/* Add Goal Form */}
                    <AnimatePresence>
                      {showAddGoal && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white p-6 rounded-xl shadow-md"
                        >
                          <h3 className="text-xl font-semibold mb-4">Add New Learning Goal</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title*</label>
                              <input
                                type="text"
                                name="title"
                                value={newGoal.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                placeholder="What do you want to achieve?"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Course*</label>
                              <select
                                name="course"
                                value={newGoal.course}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                              >
                                <option value="">Select a course</option>
                                {courses.map(course => (
                                  <option key={course} value={course}>{course}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Target Hours*</label>
                              <input
                                type="number"
                                name="targetHours"
                                value={newGoal.targetHours}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                placeholder="How many hours?"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline*</label>
                              <input
                                type="date"
                                name="deadline"
                                value={newGoal.deadline}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setShowAddGoal(false)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={handleAddGoal}
                              disabled={loading}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                            >
                              {loading ? (
                                <PulseLoader size={8} color="white" />
                              ) : (
                                <>
                                  <FaPlus className="mr-2" />
                                  Add Goal
                                </>
                              )}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Goals List */}
                    {progressData.goals.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-white rounded-xl shadow-sm"
                      >
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No goals set yet</h3>
                        <p className="text-gray-500">Add goals to track your learning progress</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {progressData.goals.map((goal, index) => (
                          <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white p-6 rounded-xl shadow-sm"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">{goal.title}</h3>
                                <p className="text-gray-600">{goal.course}</p>
                              </div>
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <FaEdit />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-gray-400 hover:text-gray-600"
                                  onClick={() => handleDeleteGoal(goal.id)}
                                >
                                  <FaTrash />
                                </motion.button>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{goal.completedHours} of {goal.targetHours} hours</span>
                                <span>{goal.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-green-600 h-2.5 rounded-full" 
                                  style={{ width: `${goal.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center text-sm text-gray-500">
                              <FaCalendarAlt className="mr-2" />
                              <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Study History</h3>
                      {progressData.history.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                          <h3 className="text-xl font-medium text-gray-700 mb-2">No history recorded</h3>
                          <p className="text-gray-500">Your study sessions will appear here</p>
                        </motion.div>
                      ) : (
                        <div className="space-y-4">
                          {progressData.history.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.01 }}
                              className="p-4 border-b border-gray-100 last:border-0"
                            >
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{item.course}</h4>
                                  <p className="text-sm text-gray-500">{item.achievement}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{item.hours} hours</p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(item.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
};

export default Progress;