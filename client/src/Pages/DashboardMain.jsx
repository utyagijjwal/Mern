import { useEffect, useState } from "react";
import { FaUniversity } from "react-icons/fa";
import {
  FiAward,
  FiBook,
  FiCheck,
  FiClock,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";

const DashboardMain = ({ token, setUser, logout }) => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.status === 200) {
          setProfile(data);
          setUser(data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, setUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Manage your account and academic information
          </p>
        </div>

        {message && (
          <div
            className={`mb-8 p-4 rounded-lg ${
              message.includes("failed")
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-green-100 text-green-800 border border-green-200"
            }`}
          >
            <div className="flex items-center justify-center">
              {message.includes("failed") ? (
                <FiAward className="mr-2" />
              ) : (
                <FiCheck className="mr-2" />
              )}
              {message}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : profile ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                      <FiUser size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                      <p className="text-blue-100">{profile.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                        <FaUniversity size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          University
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                          {profile.university || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                        <FiBook size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Field of Study
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                          {profile.fieldOfStudy || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                        <FiClock size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Member Since
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                        <FiAward size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Status
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-blue-600 mb-2">
                    <FiBook size={24} className="mx-auto" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-500">Courses</h3>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-green-600 mb-2">
                    <FiAward size={24} className="mx-auto" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-purple-600 mb-2">
                    <FiClock size={24} className="mx-auto" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-500">Active</h3>
                  <p className="text-2xl font-bold text-gray-900">3 days</p>
                </div>
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition">
                      <span>Edit Profile</span>
                      <FiSettings />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition">
                      <span>View Notes</span>
                      <FiBook />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition">
                      <span>Study Resources</span>
                      <FiAward />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Account
                  </h3>
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FiBook size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Added new note</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <FiAward size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Completed Calculus
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <FiUser size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Updated profile</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiUser className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Profile not available
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              We couldn't load your profile information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
