import React, { useEffect, useState } from "react";
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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HotelIcon from "@mui/icons-material/Hotel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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
import useAPI from '../hooks/useAPI';
import { useParams } from 'react-router-dom';

const TripDetails = () => {
  const { id } = useParams();
  const { GET, POST } = useAPI();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const [trip, setTrip] = useState({});
  // const newTrip = await GET("/api/trip/");
  // const trip = {
  //   title: "Cultural India Exploration",
  //   destination: "India",
  //   startDate: "2024-12-10",
  //   endDate: "2024-12-15",
  //   price: "2000",
  //   imageUrl:
  //     "https://www.bontravelindia.com/wp-content/uploads/2021/10/Taj-Mahal-Heritage-Tourism-India-scaled.jpg",
  //   highlights: [
  //     "Explore the grandeur of Taj Mahal and Agra Fort",
  //     "Private guided tour of Jaipur’s palaces and forts",
  //     "Witness traditional Indian dance and music performances",
  //     "Camel ride and desert safari in Rajasthan",
  //     "Participate in a local Diwali celebration",
  //   ],
  //   includedServices: [
  //     "5-star luxury accommodation",
  //     "Private transfers",
  //     "Local expert guides",
  //     "Traditional Indian meals",
  //     "Entrance fees to all attractions",
  //     "Cultural performances",
  //     "24/7 concierge",
  //   ],
  //   itinerary: [
  //     {
  //       day: 1,
  //       modeOfTransportation: "plane",
  //       hotel: { name: "Taj Palace Hotel", location: "New Delhi" },
  //       activities: [
  //         {
  //           time: "9:00 AM",
  //           description: "Visit the Red Fort",
  //           location: "Red Fort, Delhi",
  //           type: "sightseeing",
  //         },
  //         {
  //           time: "1:00 PM",
  //           description: "Lunch at a traditional Indian restaurant",
  //           location: "New Delhi",
  //           type: "dining",
  //         },
  //         {
  //           time: "3:00 PM",
  //           description: "Explore India Gate and Rashtrapati Bhavan",
  //           location: "Central Delhi",
  //           type: "sightseeing",
  //         },
  //       ],
  //     },
  //     {
  //       day: 2,
  //       modeOfTransportation: "train",
  //       hotel: { name: "Oberoi Amarvilas", location: "Agra" },
  //       activities: [
  //         {
  //           time: "6:00 AM",
  //           description: "Visit Taj Mahal at sunrise",
  //           location: "Taj Mahal",
  //           type: "sightseeing",
  //         },
  //         {
  //           time: "11:00 AM",
  //           description: "Tour Agra Fort",
  //           location: "Agra Fort",
  //           type: "sightseeing",
  //         },
  //         {
  //           time: "1:00 PM",
  //           description: "Lunch at a rooftop restaurant with a view of Taj Mahal",
  //           location: "Agra",
  //           type: "dining",
  //         },
  //       ],
  //     },
  //     {
  //       day: 3,
  //       modeOfTransportation: "train",
  //       hotel: { name: "Trident Jaipur", location: "Jaipur" },
  //       activities: [
  //         {
  //           time: "9:00 AM",
  //           description: "Visit Amber Fort and enjoy an elephant ride",
  //           location: "Amber Fort",
  //           type: "sightseeing",
  //         },
  //         {
  //           time: "1:00 PM",
  //           description: "Lunch at a traditional Rajasthani restaurant",
  //           location: "Jaipur",
  //           type: "dining",
  //         },
  //         {
  //           time: "4:00 PM",
  //           description: "Explore the City Palace and Jantar Mantar",
  //           location: "Jaipur",
  //           type: "sightseeing",
  //         },
  //       ],
  //     },
  //     {
  //       day: 4,
  //       modeOfTransportation: "car",
  //       hotel: { name: "Samode Palace", location: "Rajasthan Desert" },
  //       activities: [
  //         {
  //           time: "10:00 AM",
  //           description: "Camel ride through the Rajasthan desert",
  //           location: "Thar Desert",
  //           type: "adventure",
  //         },
  //         {
  //           time: "1:00 PM",
  //           description: "Traditional lunch in a desert village",
  //           location: "Rajasthan Desert",
  //           type: "dining",
  //         },
  //         {
  //           time: "4:00 PM",
  //           description: "Watch a traditional Rajasthani dance performance",
  //           location: "Rajasthan Desert",
  //           type: "cultural",
  //         },
  //       ],
  //     },
  //     {
  //       day: 5,
  //       modeOfTransportation: "plane",
  //       hotel: { name: "The Leela Palace", location: "New Delhi" },
  //       activities: [
  //         {
  //           time: "10:00 AM",
  //           description: "Participate in a Diwali celebration at a local temple",
  //           location: "Delhi Temple",
  //           type: "cultural",
  //         },
  //         {
  //           time: "3:00 PM",
  //           description: "Free time for shopping and relaxation",
  //           location: "New Delhi",
  //           type: "shopping",
  //         },
  //         {
  //           time: "7:00 PM",
  //           description: "Departure",
  //           location: "Delhi Airport",
  //           type: "general",
  //         },
  //       ],
  //     },
  //   ],
  // };

  useEffect(() => {
    const getAllTrips = async () => {
      try {
        const {data} = await GET(`/api/trip/${id}`);
        console.log("results", data);
        setTrip(data);
      } catch (error) {
        console.log(error);
      }
    }

    getAllTrips();
  }, []);

  const handleBooking = () => {
    toast.success("Trip booked successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setTimeout(() => navigate("/api/myTrip"), 3100);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "sightseeing":
        return <LocalActivityIcon sx={{ marginRight: "5px", color: "#ff7043" }} />;
      case "dining":
        return <RestaurantIcon sx={{ marginRight: "5px", color: "#ff9800" }} />;
      case "shopping":
        return <ShoppingCartIcon sx={{ marginRight: "5px", color: "#4caf50" }} />;
      case "adventure":
        return <DirectionsWalkIcon sx={{ marginRight: "5px", color: "#2196f3" }} />;
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
          backgroundImage: `url(${trip?.imageUrl})`,
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
            sx={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 700, color: "#1a237e" }}
          >
            {trip?.destination}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: isMobile ? "1rem" : "1.5rem", color: "#757575", marginTop: "10px" }}
          >
            <CalendarTodayIcon sx={{ marginRight: "10px" }} />
            {trip?.startDate} - {trip?.endDate}
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
            sx={{ fontSize: isMobile ? "1.5rem" : "2.5rem", fontWeight: 700, color: "#e65100" }}
          >
            <AttachMoneyIcon sx={{ marginRight: "5px" }} />
            {trip?.price}
          </Typography>
          <Typography
            className="duration"
            sx={{ fontSize: isMobile ? "1rem" : "1.5rem", fontWeight: 600, color: "#1a237e" }}
          >
            <FlightTakeoffIcon sx={{ marginRight: "5px" }} />
            {/* {trip.itinerary.length} Days */}
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
                    sx={{ fontSize: isMobile ? "1rem" : "1.2rem", marginBottom: "20px", color: "#757575" }}
                  >
                    {renderIcon(dayPlan.modeOfTransportation)} Transportation:
                    {dayPlan.modeOfTransportation}
                  </Typography>

                  <List>
                    {dayPlan.activities?.map((activity, activityIndex) => (
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