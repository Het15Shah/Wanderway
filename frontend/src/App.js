// import "./CSS/App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
