// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';
import Courses from './Pages/Cources';
import Schedule from './Pages/Schedule';
import Progress from './Pages/Progress';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <BrowserRouter> {/* This should be the ONLY Router in your app */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cources" element={<Courses />} />
        <Route path="/schedule" element={<Schedule/>} />
         <Route path="/progress" element={<Progress/>} />
         <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;