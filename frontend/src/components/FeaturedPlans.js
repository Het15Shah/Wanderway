import React from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import india from "../assets/india.jpg";
import japan from "../assets/japan.jpg";
import bali from "../assets/bali.jpg";
import maldives from "../assets/maldivas.jpg";
import paris from "../assets/paris.jpg";

const FeaturedPlans = () => {
  const plans = [
    {
      title: "Paris Getaway",
      price: "$1500",
      duration: "5 Days",
      imageUrl: paris,
    },
    {
      title: "Adventure in Bali",
      price: "$1200",
      duration: "7 Days",
      imageUrl: bali,
    },
    {
      title: "Explore Japan",
      price: "$1800",
      duration: "6 Days",
      imageUrl: japan,
    },
    {
      title: "Maldives Escape",
      price: "$2000",
      duration: "4 Days",
      imageUrl: maldives,
    },
    {
      title: "Cultural India",
      price: "$1000",
      duration: "8 Days",
      imageUrl: india,
    },
  ];

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
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: "relative",
                height: "250px", // Control card height for a rectangular shape
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: 3,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundImage: `url(${plan.imageUrl})`,
                backgroundSize: "cover", // Ensures full image coverage
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for readability
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
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
