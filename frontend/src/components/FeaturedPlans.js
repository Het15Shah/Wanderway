import React from "react";
import { Box, Card, Typography, Grid } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useNavigate } from "react-router-dom";

const FeaturedPlans = () => {
  const navigate = useNavigate();

  // Array of trips with unique IDs
  const plans = [
    {
      id: "673c7a480a687c4c75e50216",
      title: "Paris Getaway",
      price: "$1500",
      duration: "5 Days",
      imageUrl:
        "https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-videoSixteenByNine3000.jpg",
    },
    {
      id: "673c7a751c4b9fe084d57fdc",
      title: "Adventure in Bali",
      price: "$1200",
      duration: "4 Days",
      imageUrl:
        "https://images.pexels.com/photos/2587004/pexels-photo-2587004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    },
    {
      id: "673c7aa21c4b9fe084d57fe6",
      title: "Explore Japan",
      price: "$1800",
      duration: "6 Days",
      imageUrl:
        "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    },
    {
      id: "673c7bba1c4b9fe084d57ff4",
      title: "Maldives Escape",
      price: "$2000",
      duration: "4 Days",
      imageUrl:
        "https://krishnendu.org/wp-content/uploads/pexels-asad-photo-maldives-3601425-1-scaled.jpg",
    },
    {
      id: "673c7bd81c4b9fe084d58000",
      title: "Cultural India",
      price: "$1000",
      duration: "7 Days",
      imageUrl:
        "https://images.pexels.com/photos/3947637/pexels-photo-3947637.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    },
  ];

  const handleCardClick = (id) => {
    navigate(`/trip/${id}`); // Redirect to the trip details page with the trip ID
  };

  return (
    <Box
      sx={{
        padding: "50px 20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "30px",
          color: "#283593",
          fontWeight: "700",
        }}
      >
        Popular Travel Plans
      </Typography>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              onClick={() => handleCardClick(plan.id)} // Call the navigation function on click
              sx={{
                position: "relative",
                height: "250px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: 3,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundImage: `url(${plan?.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "8px" }}
                >
                  {plan.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlightTakeoffIcon fontSize="small" />
                  <Typography variant="body2">{plan.duration}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {plan.price}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedPlans;
