import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaChartLine, 
  FaAward,
  FaLightbulb,
  FaHandshake,
  FaArrowCircleRight,
  FaQuoteLeft
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('mission');
  const [scrolled, setScrolled] = useState(false);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('SignUp page loaded successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '10,000+', label: 'Active Students', icon: <FaUsers className="text-3xl" /> },
    { value: '500+', label: 'Courses', icon: <FaGraduationCap className="text-3xl" /> },
    { value: '200+', label: 'Expert Instructors', icon: <FaChartLine className="text-3xl" /> },
    { value: '98%', label: 'Satisfaction Rate', icon: <FaAward className="text-3xl" /> },
  ];

  const features = [
    {
      title: 'Personalized Learning',
      description: 'Adaptive learning paths tailored to your strengths and weaknesses.',
      icon: <FaLightbulb className="text-indigo-500 text-2xl" />
    },
    {
      title: 'Expert Guidance',
      description: 'Learn from industry professionals and academic experts.',
      icon: <FaUsers className="text-indigo-500 text-2xl" />
    },
    {
      title: 'Collaborative Environment',
      description: 'Study groups and peer learning opportunities.',
      icon: <FaHandshake className="text-indigo-500 text-2xl" />
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Education Officer',
      bio: 'PhD in Educational Technology with 15 years of experience.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Specializes in learning management systems and AI.',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Student Success Manager',
      bio: 'Dedicated to ensuring every student achieves their goals.',
      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    toast.info(`Viewing ${tab} information`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PulseLoader color="#6366f1" size={20} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative py-20 md:py-28 transition-all duration-300 ${scrolled ? 'pt-24' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-indigo-600">StudyMaster</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering students worldwide with innovative learning solutions and academic success tools.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm text-center"
              >
                <div className="text-indigo-500 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission/Vision/Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Principles</h2>
            <div className="flex justify-center space-x-4 mb-8">
              {['mission', 'vision', 'values'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-2 rounded-full font-medium ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto"
              >
                {activeTab === 'mission' && (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-600 mb-6">
                      To revolutionize education by providing accessible, personalized learning experiences that empower students 
                      to achieve their academic goals and unlock their full potential.
                    </p>
                    <div className="flex items-center text-indigo-600">
                      <FaArrowCircleRight className="mr-2" />
                      <span>Making education accessible to everyone</span>
                    </div>
                  </>
                )}
                {activeTab === 'vision' && (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                    <p className="text-gray-600 mb-6">
                      We envision a world where every learner has the tools and support they need to succeed, 
                      breaking down barriers to education and creating opportunities for lifelong learning.
                    </p>
                    <div className="flex items-center text-indigo-600">
                      <FaArrowCircleRight className="mr-2" />
                      <span>Shaping the future of education</span>
                    </div>
                  </>
                )}
                {activeTab === 'values' && (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span><strong>Integrity:</strong> We maintain the highest standards in all our interactions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span><strong>Innovation:</strong> Constantly improving our platform and methods</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span><strong>Inclusivity:</strong> Education should be accessible to all</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span><strong>Impact:</strong> Measurable results for our students</span>
                      </li>
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose StudyMaster?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed with students' success in mind, offering unique features that make learning effective and enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate educators, developers, and innovators working together to transform education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-indigo-100">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* Testimonial Section */}
<section className="py-16 bg-indigo-600 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
      <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
        Hear from students who have transformed their learning experience with StudyMaster.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {/* Testimonial 1 */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl shadow-lg text-gray-800"
      >
        <FaQuoteLeft className="text-indigo-300 text-2xl mb-4" />
        <p className="italic mb-6">
          "StudyMaster's personalized learning paths helped me improve my grades from B's to A's in just one semester. The adaptive quizzes were a game-changer!"
        </p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-100 mr-4 overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">Sarah Thompson</h4>
            <p className="text-indigo-600 text-sm">Biology Major</p>
          </div>
        </div>
      </motion.div>

      {/* Testimonial 2 */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl shadow-lg text-gray-800"
      >
        <FaQuoteLeft className="text-indigo-300 text-2xl mb-4" />
        <p className="italic mb-6">
          "As a working professional, StudyMaster's flexible schedule and mobile app allowed me to complete my MBA courses on my own time. Highly recommend!"
        </p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-100 mr-4 overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">James Rodriguez</h4>
            <p className="text-indigo-600 text-sm">MBA Student</p>
          </div>
        </div>
      </motion.div>

      {/* Testimonial 3 */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl shadow-lg text-gray-800"
      >
        <FaQuoteLeft className="text-indigo-300 text-2xl mb-4" />
        <p className="italic mb-6">
          "The collaborative study groups feature helped me connect with peers worldwide. We still study together even after graduating!"
        </p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-100 mr-4 overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/women/68.jpg" 
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">Priya Patel</h4>
            <p className="text-indigo-600 text-sm">Computer Science Graduate</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>
    </div>
  );
};

export default About;