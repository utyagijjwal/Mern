// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import MyNotes from "./Components/MyNotes";
import Navbar from "./Components/Navbar";
import VerifyOtp from "./Components/VerifyOtp";
import Courses from "./Pages/Cources";
import Dashboard from "./Pages/Dashboard";
import DashboardMain from "./Pages/DashboardMain";
import Login from "./Pages/Login";
import Progress from "./Pages/Progress";
import Register from "./Pages/Register";
import Schedule from "./Pages/Schedule";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      {" "}
      {/* This should be the ONLY Router in your app */}
      <Navbar token={token} logout={logout} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cources" element={<Courses />} />
        <Route path="/schedule" element={<Schedule token={token} />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/dashboard"
          element={
            <DashboardMain token={token} setUser={setUser} logout={logout} />
          }
        />
        <Route path="/my-notes" element={<MyNotes token={token} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
