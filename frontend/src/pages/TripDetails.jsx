import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TripDetails = () => {
  const navigate = useNavigate();

  const trip = {
    title: "Paris Getaway",
    destination: "Paris, France",
    startDate: "2024-12-01",
    endDate: "2024-12-05",
    price: "1500",
    imageUrl:
      "https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-videoSixteenByNine3000.jpg",
    itinerary: [
      {
        day: 1,
        modeOfTransportation: "plane",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          {
            time: "10:00 AM",
            description: "Visit Eiffel Tower",
            location: "Eiffel Tower",
            type: "sightseeing",
          },
          {
            time: "2:00 PM",
            description: "Lunch at Le Jules Verne",
            location: "Champ de Mars",
            type: "dining",
          },
        ],
      },
      {
        day: 2,
        modeOfTransportation: "walking",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          {
            time: "9:00 AM",
            description: "Louvre Museum tour",
            location: "Louvre Museum",
            type: "sightseeing",
          },
          {
            time: "1:00 PM",
            description: "Seine River Cruise",
            location: "Seine River",
            type: "sightseeing",
          },
        ],
      },
      {
        day: 3,
        modeOfTransportation: "walking",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          {
            time: "10:00 AM",
            description: "Montmartre art tour",
            location: "Montmartre",
            type: "sightseeing",
          },
          {
            time: "3:00 PM",
            description: "Visit Sacré-Cœur Basilica",
            location: "Sacré-Cœur",
            type: "sightseeing",
          },
        ],
      },
      {
        day: 4,
        modeOfTransportation: "walking",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          {
            time: "11:00 AM",
            description: "Shopping at Champs-Élysées",
            location: "Champs-Élysées",
            type: "shopping",
          },
          {
            time: "4:00 PM",
            description: "Relax at Tuileries Garden",
            location: "Tuileries Garden",
            type: "sightseeing",
          },
        ],
      },
      {
        day: 5,
        modeOfTransportation: "plane",
        activities: [
          {
            time: "10:00 AM",
            description: "Free time and departure",
            location: "Paris Airport",
            type: "general",
          },
        ],
      },
    ],
  };

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
    setTimeout(() => navigate("/booking"), 3100);
  };

  // Function to render activity icons based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "sightseeing":
        return <LocalActivityIcon sx={{ marginRight: "5px" }} />;
      case "dining":
        return <RestaurantIcon sx={{ marginRight: "5px" }} />;
      case "shopping":
        return <ShoppingCartIcon sx={{ marginRight: "5px" }} />;
      default:
        return <LocationOnIcon sx={{ marginRight: "5px" }} />;
    }
  };

  const renderIcon = (mode) => {
    switch (mode) {
      case "plane":
        return <FlightTakeoffIcon />;
      case "walking":
        return <DirectionsWalkIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: "0", backgroundColor: "#f4f7fc" }}>
      <Box
        className="trip-hero"
        sx={{
          backgroundImage: `url(${trip.imageUrl})`,
          width: "100%",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          borderBottom: "5px solid #e65100",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: "4rem",
            fontWeight: 800,
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
            zIndex: 2,
            animation: "fadeInDown 1s ease",
          }}
        >
          {trip.title}
        </Typography>
      </Box>

      <Box
        className="trip-content"
        sx={{
          padding: "50px 30px",
          maxWidth: "900px",
          margin: "-100px auto 0",
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
            sx={{ fontSize: "3rem", fontWeight: 700, color: "#1a237e" }}
          >
            {trip.destination}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.5rem", color: "#757575", marginTop: "10px" }}
          >
            <CalendarTodayIcon sx={{ marginRight: "10px" }} />
            {trip.startDate} - {trip.endDate}
          </Typography>
        </Box>

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
            sx={{ fontSize: "2.5rem", fontWeight: 700, color: "#e65100" }}
          >
            <AttachMoneyIcon sx={{ marginRight: "5px" }} />
            {trip.price}
          </Typography>
          <Typography
            className="duration"
            sx={{ fontSize: "1.5rem", fontWeight: 600, color: "#1a237e" }}
          >
            <FlightTakeoffIcon sx={{ marginRight: "5px" }} />
            {trip.itinerary.length} Days
          </Typography>
        </Box>

        <Box className="trip-itinerary" sx={{ marginTop: "40px" }}>
          {trip.itinerary.map((dayPlan, index) => (
            <Card
              key={index}
              className="day-card"
              sx={{
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "10px",
                background: "linear-gradient,to right, #e3f2fd, #ffebee",
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
                  fontSize: "1.8rem",
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
                  fontSize: "1.1rem",
                  color: "#616161",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "15px",
                }}
              >
                {renderIcon(dayPlan.modeOfTransportation)}{" "}
                {dayPlan.modeOfTransportation}
              </Typography>

              <List
                className="activities"
                sx={{ marginTop: "15px", marginLeft: "20px", paddingLeft: "20px" }}
              >
                {dayPlan.activities.map((activity, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={
                        <Typography sx={{ display: "flex", alignItems: "center" }}>
                          {getActivityIcon(activity.type)} {activity.time} -{" "}
                          {activity.description} at {activity.location}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", marginTop: "50px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "1.2rem",
              padding: "10px 25px",
              borderRadius: "30px",
              transition: "background-color 0.3s, transform 0.2s",
              "&:hover": {
                backgroundColor: "#5c6bc0",
                transform: "scale(1.05)",
              },
            }}
            onClick={handleBooking}
          >
            Book Your Trip
          </Button>
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default TripDetails;
