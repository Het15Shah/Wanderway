import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Grid, Typography, Card } from "@mui/material";
import { blue, orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const SearchSection = () => {
  const { GET } = useAPI();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    destination: "",
    budget: "",
    days: "",
  });
  const [isSearchMade, setIsSearchMade] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };
  // const [imageUrl, setImageUrl] = useState([]);

  // let fetchedImageUrl = [];
  const handleSearch = async () => {
    try {
      const { data } = await GET("/api/searchTrip", { params: searchCriteria });
      setIsLoading(true);
      // fetchedImageUrl = await fetchImage(
      //   searchCriteria.destination,
      //   data.length
      // );
      // console.log("Fetched Image URL:", fetchedImageUrl[0]);
      // setImageUrl(fetchedImageUrl); // Update the state with the fetched image URL
      setPlans(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setIsSearchMade(true); // Mark that a search was made
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  const handleCardClick = (_id) => {
    // console.log("Card clicked:", id);
    navigate(`/trip/${_id}`); // Redirect to the trip details page with the trip ID
  };

  return (
    <section
      className="search-section"
      style={{
        backgroundColor: blue[50],
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      {/* Search Form */}
      <Typography
        variant="h4"
        gutterBottom
        style={{
          marginBottom: "40px",
          fontWeight: 600,
          color: blue[900],
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Find Your Next Adventure
      </Typography>

      <Box
        className="search-form"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#ffffff",
          padding: "40px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Destination"
              name="destination"
              value={searchCriteria.destination}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <i
                    className="fas fa-map-marker-alt"
                    style={{ color: orange[500], marginRight: "8px" }}
                  />
                ),
                style: {
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  paddingLeft: "16px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Budget"
              name="budget"
              type="number"
              value={searchCriteria.budget}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <i
                    className="fas fa-dollar-sign"
                    style={{ color: orange[500], marginRight: "8px" }}
                  />
                ),
                style: {
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  paddingLeft: "16px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Days"
              name="days"
              type="number"
              value={searchCriteria.days}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <i
                    className="fas fa-calendar-alt"
                    style={{ color: orange[500], marginRight: "8px" }}
                  />
                ),
                style: {
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  paddingLeft: "16px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{
                height: "100%",
                borderRadius: "8px",
                fontWeight: 600,
                backgroundColor: orange[500],
                textTransform: "none",
              }}
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Search Results */}
      {isSearchMade && !isLoading && (
        <>
          <Typography
            variant="h4"
            sx={{
              marginTop: "40px",
              marginBottom: "30px",
              color: "#283593",
              fontWeight: "700",
            }}
          >
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {plans?.length > 0 ? (
              plans?.map((plan, index) => (
                <Grid item xs={12} sm={6} md={4} key={plan._id}>
                  <Card
                    onClick={() => handleCardClick(plan._id)}
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
                      backgroundImage: `url(${plan?.imageURL})`,
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <FlightTakeoffIcon fontSize="small" />
                        <Typography variant="body2">{plan.duration}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {plan.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No results found.</Typography>
            )}
          </Grid>
        </>
      )}
    </section>
  );
};

export default SearchSection;
