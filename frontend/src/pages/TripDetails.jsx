import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"; // Import missing components here
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HotelIcon from "@mui/icons-material/Hotel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import "../CSS/TripDetails.css"; // Import the CSS file

const TripDetails = () => {
  const navigate = useNavigate();

  const trip = {
    title: "Paris Getaway",
    destination: "Paris, France",
    startDate: "2024-12-01",
    endDate: "2024-12-05",
    price: "$1500",
    imageUrl:
      "https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-videoSixteenByNine3000.jpg",
    itinerary: [
      {
        day: 1,
        modeOfTransportation: "plane",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          { time: "10:00 AM", description: "Visit Eiffel Tower", location: "Eiffel Tower" },
          { time: "2:00 PM", description: "Lunch at Le Jules Verne", location: "Champ de Mars" },
        ],
      },
      {
        day: 2,
        modeOfTransportation: "walking",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          { time: "9:00 AM", description: "Louvre Museum tour", location: "Louvre Museum" },
          { time: "1:00 PM", description: "Seine River Cruise", location: "Seine River" },
        ],
      },
      {
        day: 3,
        modeOfTransportation: "walking",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          { time: "10:00 AM", description: "Montmartre art tour", location: "Montmartre" },
          { time: "3:00 PM", description: "Visit Sacré-Cœur Basilica", location: "Sacré-Cœur" },
        ],
      },
      {
        day: 4,
        modeOfTransportation: "walking",
        hotel: { name: "Le Paris Hotel", location: "Paris City Center" },
        activities: [
          { time: "11:00 AM", description: "Shopping at Champs-Élysées", location: "Champs-Élysées" },
          { time: "4:00 PM", description: "Relax at Tuileries Garden", location: "Tuileries Garden" },
        ],
      },
      {
        day: 5,
        modeOfTransportation: "plane",
        activities: [
          { time: "10:00 AM", description: "Free time and departure", location: "Paris Airport" },
        ],
      },
    ],
  };

  return (
    <Box sx={{ padding: "0", backgroundColor: "#f4f7fc" }}>
      {/* Hero Section with Trip Image */}
      <Box
        className="trip-hero"
        sx={{
          backgroundImage: `url(${trip.imageUrl})`,
        }}
      >
        <Typography variant="h1">{trip.title}</Typography>
      </Box>

      {/* Content Section */}
      <Box className="trip-content">
        <Box className="trip-details-header">
          <Typography variant="h2">{trip.destination}</Typography>
          <Typography variant="body1">
            <CalendarTodayIcon sx={{ marginRight: "10px" }} />
            {trip.startDate} - {trip.endDate}
          </Typography>
        </Box>

        {/* Trip Price and Duration */}
        <Box className="trip-summary">
          <Typography className="price">
            <AttachMoneyIcon sx={{ marginRight: "5px" }} />
            {trip.price}
          </Typography>
          <Typography className="duration">
            <FlightTakeoffIcon sx={{ marginRight: "5px" }} />
            {trip.itinerary.length} Days
          </Typography>
        </Box>

        {/* Trip Itinerary */}
        <Box className="trip-itinerary">
          {trip.itinerary.map((dayPlan, index) => (
            <Card key={index} className="day-card">
              <Typography variant="h4">Day {dayPlan.day}</Typography>
              <Typography className="transport-mode">
                <FlightTakeoffIcon sx={{ marginRight: "5px" }} />
                {dayPlan.modeOfTransportation}
              </Typography>

              <List className="activities">
                {dayPlan.activities.map((activity, idx) => (
                  <ListItem key={idx} className="activity-item">
                    <ListItemText
                      primary={`${activity.time} - ${activity.description}`}
                      secondary={`Location: ${activity.location}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          ))}
        </Box>

        {/* Book Now Button */}
        <Button
          variant="contained"
          className="book-button"
          onClick={() => navigate("/booking")}
        >
          Book Your Trip
        </Button>
      </Box>
    </Box>
  );
};

export default TripDetails;
