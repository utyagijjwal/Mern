import { Link, useLocation, useNavigate } from "react-router-dom";

import { React, useState } from "react";

const BackendURL = import.meta.env.BACKEND_URL;


const VerifyOTP = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    email: state?.email || "",
    otp: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setMessage("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to {formData.email}
        </p>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
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
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Back to{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
