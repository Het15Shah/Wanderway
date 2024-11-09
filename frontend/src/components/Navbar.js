import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent", // Fully transparent background
        boxShadow: "none", // No shadow to let the image shine through
        zIndex: 1000, // Ensures the navbar stays on top of content
      }}
      className="navbar"
    >
      <Toolbar className="container">
        {/* Brand Name */}
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
          Wanderways
        </Typography>

        {/* Navbar Links */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            component={Link}
            to="#home"
            variant="text"
            color="inherit"
            sx={{
              fontSize: "18px",
              textTransform: "none",
              color: "#fff", // Button text color
              "&:hover": {
                color: "#FF8C00", // Green on hover
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)", // Subtle glow on hover
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/about-us"
            variant="text"
            color="inherit"
            sx={{
              fontSize: "18px",
              textTransform: "none",
              color: "#fff",
              "&:hover": {
                color: "#FF8C00",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            About Us
          </Button>
          <Button
            component={Link}
            to="#login"
            variant="text"
            color="inherit"
            sx={{
              fontSize: "18px",
              textTransform: "none",
              color: "#fff",
              "&:hover": {
                color: "#FF8C00",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="#signup"
            variant="contained"
            sx={{
              backgroundColor: "#FF8C00", // Lighter yellow-orange color
              color: "#fff",
              textTransform: "none",
              fontSize: "18px",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow for depth
              "&:hover": {
                backgroundColor: "#fff", // White on hover
                color: "#FFA726", // Yellow-orange color text on hover
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)", // Enhance hover effect
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
