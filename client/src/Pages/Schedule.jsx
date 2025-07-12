import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt,
  FaClock,
  FaBookOpen,
  FaChalkboardTeacher,
  FaBell,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaEdit
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: '',
    course: '',
    date: '',
    time: '',
    description: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDay, setActiveDay] = useState('Monday');

  // Days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Sample courses
  const courses = [
    'Computer Science 101',
    'Mathematics Advanced',
    'Literature Survey',
    'Physics Fundamentals',
    'History of Science'
  ];

  // Simulate fetching schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - in a real app, you would fetch from an API
        const mockSchedule = [
          {
            id: 1,
            title: 'CS101 Lecture',
            course: 'Computer Science 101',
            day: 'Monday',
            time: '09:00 - 11:00',
            description: 'Introduction to algorithms',
            color: 'bg-blue-100 text-blue-800'
          },
          {
            id: 2,
            title: 'Math Class',
            course: 'Mathematics Advanced',
            day: 'Monday',
            time: '13:00 - 15:00',
            description: 'Linear algebra concepts',
            color: 'bg-purple-100 text-purple-800'
          },
          // Add more mock events...
        ];

        setSchedule(mockSchedule);
        toast.success('Schedule loaded successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Failed to load schedule', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
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
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.course || !newEvent.date || !newEvent.time) {
      toast.warn('Please fill all required fields', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    toast.info('Adding new event...', {
      position: 'top-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      const eventDay = new Date(newEvent.date).toLocaleDateString('en-US', { weekday: 'long' });
      const newEventObj = {
        id: schedule.length + 1,
        title: newEvent.title,
        course: newEvent.course,
        day: eventDay,
        time: newEvent.time,
        description: newEvent.description,
        color: `bg-${['blue', 'purple', 'green', 'yellow', 'indigo'][Math.floor(Math.random() * 5)]}-100 text-${['blue', 'purple', 'green', 'yellow', 'indigo'][Math.floor(Math.random() * 5)]}-800`
      };

      setSchedule([...schedule, newEventObj]);
      setNewEvent({
        title: '',
        course: '',
        date: '',
        time: '',
        description: ''
      });
      setShowForm(false);
      setLoading(false);
      toast.success('Event added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }, 1500);
  };

  const handleDeleteEvent = (id) => {
    setLoading(true);
    toast.info('Deleting event...', {
      position: 'top-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      setSchedule(schedule.filter(event => event.id !== id));
      setLoading(false);
      toast.success('Event deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }, 1000);
  };

  const filteredEvents = schedule.filter(event => event.day === activeDay);

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
              Your Study Schedule
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Organize your learning journey with a personalized schedule
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Schedule Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Day Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 overflow-x-auto"
          >
            <div className="flex space-x-2 pb-2">
              {days.map(day => (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeDay === day 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Add Event Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg"
            >
              <FaPlus />
              <span>Add New Event</span>
            </motion.button>
          </motion.div>

          {/* Add Event Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">Add New Schedule Event</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Lecture, Study Session, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course*</label>
                    <select
                      name="course"
                      value={newEvent.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select a course</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                    <input
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
                    <input
                      type="time"
                      name="time"
                      value={newEvent.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newEvent.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Additional details about the event"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddEvent}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    {loading ? (
                      <PulseLoader size={8} color="white" />
                    ) : (
                      <>
                        <FaPlus className="mr-2" />
                        Add Event
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Schedule Events */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <PulseLoader color="#6366f1" size={20} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaCalendarAlt className="mr-3 text-indigo-600" />
                  {activeDay}'s Schedule
                </h2>

                {filteredEvents.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No events scheduled</h3>
                    <p className="text-gray-500">Add new events to organize your study time</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className={`p-4 rounded-lg border-l-4 ${event.color} border-indigo-500 shadow-sm`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="text-gray-600">{event.course}</p>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <FaTrash />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <FaEdit />
                            </motion.button>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <FaClock className="mr-2" />
                          <span>{event.time}</span>
                        </div>
                        {event.description && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>{event.description}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Schedule;