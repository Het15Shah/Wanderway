import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AboutUs from "./pages/AboutUs";
import TripDetail from "./pages/TripDetails";
import Login from "./pages/Login";
import SignUpPage from "./pages/Signup";
import Addtrips from "./pages/Addtrips";
import ReviewPage from "./pages/Reviewpage";
import MyTrip from "./pages/MyTrip";
import CustomItineraryForm from "./pages/customtrip"; // Ensure this import is correct

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
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/my-trips" element={<MyTrip />} />
        <Route path="/create" element={<CustomItineraryForm />} /> {/* Correct route */}
      </Routes>
    </>
  );
}

export default App;