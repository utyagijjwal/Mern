import { React, useEffect, useState } from "react";

const BackendURL = import.meta.env.BACKEND_URL;

const DashboardMain = ({ token, setUser, logout }) => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BackendURL}/api/auth/profile`, {
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
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Your Dashboard
        </h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
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
        ) : profile ? (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <p className="text-lg text-gray-700 mb-2">
                <strong>Full Name:</strong> {profile.fullName}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>University:</strong> {profile.university}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {profile.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600">Unable to load profile.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
