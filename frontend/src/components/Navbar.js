import React, { memo, useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Slide } from "@mui/material";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import useAPI from "../hooks/useAPI";

const Navbar = memo(() => {
  const {GET} = useAPI();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const validateUser = async() => {
      const authToken = Cookies.get("token");
      // console.log(authToken, "authToken");
      // Cookies.set("token_sdj", authToken, { expires: 1 });
      if (authToken) {
        try {
          const response = await GET("/api/user/myProfile", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          console.log(response.data, "response");
          if (response.data.user.role === "ADMIN") {
            setIsAdmin(true);
          }
          navigate("/");
        } catch (error) {
          console.error("Error validating user:", error);
        }
      }
    };
    

    validateUser();
  }, []);

  // Track scrolling direction to toggle the navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Show navbar when scrolling up, hide it when scrolling down
      setShowNavbar(isScrollingUp || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const isLoggedIn = Cookies.get("token");

  return (
    <Slide direction="down" in={showNavbar} timeout={{ enter: 500, exit: 300 }}>
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
              to="/"
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

           {isAdmin && (<Button
              component={Link}
              to="/add-trips"
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
              Add trips
            </Button>
            )}
            
{isLoggedIn && (
              <>
                <Button
                  component={Link}
                  to="/create"
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
                  create trip
                </Button>
                
              </>
            )}
            {/* Conditionally render My Trips and Profile buttons if logged in */}
            {isLoggedIn && (
              <>
                <Button
                  component={Link}
                  to="/my-trips"
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
                  My Trips
                </Button>
                <Avatar
                  onClick={() => navigate("/profile")}
                  src="/broken-image.jpg"
                  sx={{ cursor: "pointer" }}
                />
              </>
            )}


            {/* Render Login and Sign Up buttons if not logged in */}
            {!isLoggedIn && (
              <>
                <Button
                  component={Link}
                  to="/login"
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
                  to="/signup"
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
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
});

export default Navbar;
