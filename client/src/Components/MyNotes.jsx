import { useEffect, useState } from "react";
import { FaGoogleDrive } from "react-icons/fa";
import {
  FiArrowLeft,
  FiCheck,
  FiDownload,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MyNotes = ({ token }) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    driveLink: "",
  });
  const [editNoteId, setEditNoteId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.status === 200) {
          setNotes(data.notes || []);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("Failed to fetch notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage("");
    try {
      const url = editNoteId
        ? `http://localhost:8000/api/auth/notes/${editNoteId}`
        : "http://localhost:8000/api/auth/notes";
      const method = editNoteId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status === 201 || res.status === 200) {
        setNotes(data.notes);
        setFormData({ name: "", subject: "", driveLink: "" });
        setEditNoteId(null);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(editNoteId ? "Failed to update note." : "Failed to add note.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (note) => {
    setFormData({
      name: note.name,
      subject: note.subject,
      driveLink: note.driveLink,
    });
    setEditNoteId(note._id);
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setFormLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `http://localhost:8000/api/auth/notes/${noteId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setNotes(data.notes);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Failed to delete note.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDownload = (driveLink) => {
    window.open(driveLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Notes Manager
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Organize and manage all your study notes in one place
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("failed")
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-green-100 text-green-800 border border-green-200"
            }`}
          >
            <div className="flex items-center justify-center">
              {message.includes("failed") ? (
                <FiX className="mr-2" />
              ) : (
                <FiCheck className="mr-2" />
              )}
              {message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editNoteId ? "Edit Note" : "Add New Note"}
                </h2>
                {editNoteId && (
                  <button
                    onClick={() => {
                      setFormData({ name: "", subject: "", driveLink: "" });
                      setEditNoteId(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 transition"
                    title="Cancel edit"
                  >
                    <FiArrowLeft size={20} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Calculus Lecture 1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Google Drive Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGoogleDrive className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="driveLink"
                      value={formData.driveLink}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                    formLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                >
                  {formLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : editNoteId ? (
                    <>
                      <FiEdit2 className="mr-2" />
                      Update Note
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      Add Note
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Notes List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Your Notes
                </h2>

                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : notes.length > 0 ? (
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {notes.map((note) => (
                        <div
                          key={note._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">
                                {note.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {note.subject}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDownload(note.driveLink)}
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition"
                                title="Download"
                              >
                                <FiDownload size={18} />
                              </button>
                              <button
                                onClick={() => handleEdit(note)}
                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(note._id)}
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-3">
                            <a
                              href={note.driveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                            >
                              <FaGoogleDrive className="mr-1" />
                              View on Google Drive
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiPlus className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      No notes yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by adding your first note.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
