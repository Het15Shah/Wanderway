// import "./CSS/App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AboutUs from "./pages/AboutUs";
import TripDetail from "./pages/TripDetails";
import Login from "./pages/Login"
import SignUpPage from "./pages/Signup";
import Addtrips from "./pages/Addtrips";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/trip/:id" element={<TripDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add-trips" element={<Addtrips />} />
      </Routes>
    </>
  );
}

export default App;
