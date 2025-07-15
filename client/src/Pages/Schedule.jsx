import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Schedule = ({ token }) => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    course: "",
    date: "",
    time: "",
    description: "",
  });
  const [editEventId, setEditEventId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDay, setActiveDay] = useState("Monday");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const courses = [
    "Computer Science 101",
    "Mathematics Advanced",
    "Literature Survey",
    "Physics Fundamentals",
    "History of Science",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.status === 200) {
          const formattedSchedule = data.schedule.map((event) => ({
            ...event,
            day: new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            color: `bg-${
              ["blue", "purple", "green", "yellow", "indigo"][
                Math.floor(Math.random() * 5)
              ]
            }-100 text-${
              ["blue", "purple", "green", "yellow", "indigo"][
                Math.floor(Math.random() * 5)
              ]
            }-800`,
          }));
          setSchedule(formattedSchedule);
          toast.success("Schedule loaded successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error("Failed to load schedule", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateEvent = async () => {
    if (
      !newEvent.title ||
      !newEvent.course ||
      !newEvent.date ||
      !newEvent.time
    ) {
      toast.warn("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setFormLoading(true);
    try {
      const url = editEventId
        ? `http://localhost:8000/api/auth/schedule/${editEventId}`
        : "http://localhost:8000/api/auth/schedule";
      const method = editEventId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      if (res.status === 201 || res.status === 200) {
        const formattedSchedule = data.schedule.map((event) => ({
          ...event,
          day: new Date(event.date).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          color: `bg-${
            ["blue", "purple", "green", "yellow", "indigo"][
              Math.floor(Math.random() * 5)
            ]
          }-100 text-${
            ["blue", "purple", "green", "yellow", "indigo"][
              Math.floor(Math.random() * 5)
            ]
          }-800`,
        }));
        setSchedule(formattedSchedule);
        setNewEvent({
          title: "",
          course: "",
          date: "",
          time: "",
          description: "",
        });
        setEditEventId(null);
        setShowForm(false);
        toast.success(
          editEventId
            ? "Event updated successfully!"
            : "Event added successfully!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(
        editEventId ? "Failed to update event." : "Failed to add event.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditEvent = (event) => {
    setNewEvent({
      title: event.title,
      course: event.course,
      date: new Date(event.date).toISOString().split("T")[0],
      time: event.time,
      description: event.description || "",
    });
    setEditEventId(event._id);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setFormLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/auth/schedule/${eventId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        const formattedSchedule = data.schedule.map((event) => ({
          ...event,
          day: new Date(event.date).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          color: `bg-${
            ["blue", "purple", "green", "yellow", "indigo"][
              Math.floor(Math.random() * 5)
            ]
          }-100 text-${
            ["blue", "purple", "green", "yellow", "indigo"][
              Math.floor(Math.random() * 5)
            ]
          }-800`,
        }));
        setSchedule(formattedSchedule);
        toast.success("Event deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to delete event.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setFormLoading(false);
    }
  };

  const filteredEvents = schedule.filter((event) => event.day === activeDay);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white transition-all duration-300 ${
          scrolled ? "pt-24" : ""
        }`}
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

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 overflow-x-auto"
          >
            <div className="flex space-x-2 pb-2">
              {days.map((day) => (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeDay === day
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {day}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowForm(!showForm);
                setEditEventId(null);
                setNewEvent({
                  title: "",
                  course: "",
                  date: "",
                  time: "",
                  description: "",
                });
              }}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg"
            >
              <FaPlus />
              <span>
                {showForm && !editEventId ? "Hide Form" : "Add New Event"}
              </span>
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {editEventId
                    ? "Edit Schedule Event"
                    : "Add New Schedule Event"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title*
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course*
                    </label>
                    <select
                      name="course"
                      value={newEvent.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date*
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time*
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={newEvent.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
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
                    onClick={() => {
                      setShowForm(false);
                      setEditEventId(null);
                      setNewEvent({
                        title: "",
                        course: "",
                        date: "",
                        time: "",
                        description: "",
                      });
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddOrUpdateEvent}
                    disabled={formLoading}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center ${
                      formLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {formLoading ? (
                      <div className="flex items-center">
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
                        {editEventId ? "Updating..." : "Adding..."}
                      </div>
                    ) : (
                      <>
                        <FaPlus className="mr-2" />
                        {editEventId ? "Update Event" : "Add Event"}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600"
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
                    <h3 className="text-xl font-medium text-gray-700 mb-2">
                      No events scheduled
                    </h3>
                    <p className="text-gray-500">
                      Add new events to organize your study time
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map((event, index) => (
                      <motion.div
                        key={event._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className={`p-4 rounded-lg border-l-4 ${event.color} border-indigo-500 shadow-sm`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {event.title}
                            </h3>
                            <p className="text-gray-600">{event.course}</p>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleDeleteEvent(event._id)}
                            >
                              <FaTrash />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleEditEvent(event)}
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
