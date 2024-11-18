import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HotelIcon from "@mui/icons-material/Hotel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import Train from "@mui/icons-material/Train";
import DirectionsBus from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import fetchImage from "../utils/fetchimage.js";
import "react-toastify/dist/ReactToastify.css";

const formate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const TripDetails = () => {
  const { GET, POST } = useAPI();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page loads
  }, []);

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getTripById = async () => {
      try {
        const response = await GET(`/api/trip/${id}`);
        // console.log("Trip by ID:", response.data);
        setTrip(response.data);
        const fetchedImageUrl = await fetchImage(response.data.destination, 5);
        // console.log("Fetched image URL:", fetchedImageUrl);
        setImageUrl(fetchedImageUrl[3]); // Update the state with the fetched image URL
      } catch (error) {
        console.error("Error fetching trip by ID:", error);
      }
    };

    getTripById();
  }, [id]);

  // const handleBooking = () => {
  //   toast.success("Trip booked successfully!", {
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: "colored",
  //   });
  //   // setTimeout(() => navigate("/booking"), 3100);
  // };

  const handleBooking = async () => {
    try {
      const response = await GET("/api/user/myProfile");
      // console.log("API Response:", response);

      // Check if the response indicates the user is authenticated
      if (!response.data.success) {
        // console.log("User not authenticated");
        toast.error("Please log in to book the trip", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setTimeout(() => navigate("/login"), 3000); // Delay the navigation

        return;
      }
      // console.log("User authenticated");
      // If logged in, proceed with booking
      await POST(`/api/myTrip/book/${trip._id}`);
      // console.log("Trip booked successfully!jhbdfdfjbjbf");
      toast.success("Trip booked successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setTimeout(() => navigate("/my-trips"), 3000);
    } catch (error) {
      console.error("Error during booking:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Please log in to book the trip", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        navigate("/login");
      } else {
        toast.error("Failed to book the trip", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "sightseeing":
        return (
          <LocalActivityIcon sx={{ marginRight: "5px", color: "#ff7043" }} />
        );
      case "dining":
        return <RestaurantIcon sx={{ marginRight: "5px", color: "#ff9800" }} />;
      case "shopping":
        return (
          <ShoppingCartIcon sx={{ marginRight: "5px", color: "#4caf50" }} />
        );
      case "adventure":
        return (
          <DirectionsWalkIcon sx={{ marginRight: "5px", color: "#2196f3" }} />
        );
      case "cultural":
        return <HotelIcon sx={{ marginRight: "5px", color: "#9c27b0" }} />;
      default:
        return <LocationOnIcon sx={{ marginRight: "5px", color: "#2196f3" }} />;
    }
  };

  const renderIcon = (mode) => {
    switch (mode) {
      case "plane":
        return <FlightTakeoffIcon sx={{ color: "#ff5722" }} />;
      case "walking":
        return <DirectionsWalkIcon sx={{ color: "#2196f3" }} />;
      case "train":
        return <Train sx={{ color: "#ff9800" }} />;
      case "car":
        return <DirectionsCar sx={{ color: "#4caf50" }} />;
      case "bus":
        return <DirectionsBus sx={{ color: "#ff7043" }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: "0", backgroundColor: "#f4f7fc" }}>
      {/* Hero Section */}
      <Box
        className="trip-hero"
        sx={{
          backgroundImage: `url(${
            trip?.imageURL && trip?.imageURL.startsWith("https://example.com")
              ? imageUrl
              : trip.imageURL
          })`,
          width: "100%",
          height: isMobile ? "300px" : "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          borderBottom: "5px solid #e65100",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: isMobile ? "2rem" : "4rem",
            fontWeight: 800,
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
            zIndex: 2,
            animation: "fadeInDown 1s ease",
          }}
        >
          {trip?.title}
        </Typography>
      </Box>

      {/* Trip Content */}
      <Box
        className="trip-content"
        sx={{
          padding: isMobile ? "20px 10px" : "50px 30px",
          maxWidth: "1200px",
          margin: isMobile ? "-50px auto 0" : "-100px auto 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
          zIndex: 10,
          position: "relative",
        }}
      >
        <Box
          className="trip-details-header"
          sx={{
            marginBottom: "30px",
            textAlign: "center",
            borderBottom: "2px solid #e65100",
            paddingBottom: "15px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile ? "2rem" : "3rem",
              fontWeight: 700,
              color: "#1a237e",
            }}
          >
            {trip?.destination}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: isMobile ? "1rem" : "1.5rem",
              color: "#757575",
              marginTop: "10px",
            }}
          >
            <CalendarTodayIcon sx={{ marginRight: "10px" }} />
            {formate(trip?.startDate)} - {formate(trip?.endDate)}
          </Typography>
        </Box>

        {/* Price & Duration */}
        <Box
          className="trip-summary"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "30px",
            background: "linear-gradient(to right, #e3f2fd, #ffebee)",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            className="price"
            sx={{
              fontSize: isMobile ? "1.3rem" : "2.4rem", // Matches the text size
              fontWeight: 700,
              color: "#e65100",
              display: "flex", // Use flexbox for alignment
              alignItems: "center", // Align icon and text vertically
            }}
          >
            {/* Adjusted Icon Size and Spacing */}
            <AttachMoneyIcon
              sx={{
                fontSize: isMobile ? "1.5rem" : "2.5rem", // Matches typography size
                marginRight: "-8px", // Spacing between icon and budget value
              }}
            />
            {trip?.budget}
          </Typography>

          <Typography
            className="duration"
            sx={{
              fontSize: isMobile ? "1rem" : "1.5rem",
              fontWeight: 600,
              color: "#1a237e",
            }}
          >
            {/* <i class="fa-solid fa-plane"></i> */}
            <FlightTakeoffIcon sx={{ marginRight: "5px" }} />
            {trip?.itinerary?.length} Days
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Itinerary */}
          <Grid item xs={12} md={8}>
            <Box className="trip-itinerary" sx={{ marginTop: "40px" }}>
              {trip?.itinerary?.map((dayPlan, index) => (
                <Card
                  key={index}
                  className="day-card"
                  sx={{
                    marginBottom: "20px",
                    padding: "20px",
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #e3f2fd, #ffebee)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: isMobile ? "1.2rem" : "1.8rem",
                      fontWeight: "bold",
                      color: "#1a237e",
                      marginBottom: "10px",
                      paddingLeft: "15px",
                    }}
                  >
                    Day {dayPlan.day}
                  </Typography>
                  <Typography
                    className="transport-mode"
                    sx={{
                      fontSize: isMobile ? "1rem" : "1.2rem",
                      marginBottom: "20px",
                      color: "#757575",
                    }}
                  >
                    {renderIcon(dayPlan.modeOfTransportation)} Transportation:
                    {dayPlan.modeOfTransportation}
                  </Typography>

                  <List>
                    {dayPlan.activities.map((activity, activityIndex) => (
                      <ListItem key={activityIndex}>
                        {getActivityIcon(activity.type)}
                        <ListItemText
                          primary={activity.description}
                          secondary={`Time: ${activity.time} | Location: ${activity.location}`}
                          sx={{ color: "#424242" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: "white",
                position: "sticky",
                top: 24,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1a237e",
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                ✨ Trip Highlights
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {trip?.highlights?.map((highlight, index) => (
                  <Box
                    key={index}
                    onMouseEnter={() => setHoveredHighlight(index)}
                    onMouseLeave={() => setHoveredHighlight(null)}
                    sx={{
                      position: "relative",
                      p: 2,
                      borderRadius: 2,
                      bgcolor:
                        hoveredHighlight === index
                          ? "rgba(99, 102, 241, 0.1)"
                          : "rgba(240, 240, 240, 0.5)",
                      border: "1px solid",
                      borderColor:
                        hoveredHighlight === index
                          ? "rgba(99, 102, 241, 0.3)"
                          : "rgba(226, 232, 240, 0.8)",
                      transform:
                        hoveredHighlight === index
                          ? "translateX(8px)"
                          : "translateX(0)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "rgba(99, 102, 241, 0.1)",
                        borderColor: "rgba(99, 102, 241, 0.3)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#1a237e",
                        fontWeight: hoveredHighlight === index ? 600 : 500,
                        fontSize: isMobile ? "0.9rem" : "1.1rem",
                      }}
                    >
                      {highlight}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#1a237e",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  🏷️ Included Services
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {trip?.includedServices?.map((service, index) => (
                    <Chip
                      key={index}
                      label={service}
                      sx={{
                        bgcolor: "rgba(99, 102, 241, 0.1)",
                        color: "#1a237e",
                        fontWeight: 500,
                        "&:hover": {
                          bgcolor: "rgba(99, 102, 241, 0.2)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Booking Button */}
        <Box sx={{ textAlign: "center", marginTop: "40px" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleBooking}
            sx={{
              padding: "10px 30px",
              fontSize: isMobile ? "1rem" : "1.5rem",
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: "8px",
              background: "#ff5722",
              "&:hover": {
                backgroundColor: "#e64a19",
              },
            }}
          >
            Book Your Trip Now
          </Button>
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default TripDetails;
