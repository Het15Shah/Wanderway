import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Snackbar,
  Modal,
  TextField,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import MuiAlert from "@mui/material/Alert";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import useAPI from "../hooks/useAPI";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailIcon from "@mui/icons-material/Email";
import fetchImage from "../utils/fetchimage";

const MyTrips = () => {
  const { GET, POST } = useAPI();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [counts, setCounts] = useState({ upcoming: 0, past: 0, canceled: 0 });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await GET("/api/myTrip/alltrips");
        console.log(response.data);
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
        toast.error("Failed to fetch trips. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    let upcoming = 0;
    let past = 0;
    let canceled = 0;

    trips.forEach(async (trip) => {
      const img = String(trip?.trip?.imageURL);
      if (img && img.startsWith("https://example.com")) {
        const fetchedImageUrl = await fetchImage(trips.destination, 1);
        trip.trip.imageURL = fetchedImageUrl[0];
      }

      const startDate = new Date(trip.trip.created_at);
      const updatedAt = new Date(trip.trip.startDate);

      if (trip.status == "canceled") {
        canceled++;
        // upcoming--;
      } else if (updatedAt > startDate) {
        upcoming++;
      } else if (updatedAt < startDate) {
        past++;
      }
    });

    setCounts({ upcoming, past, canceled });
  }, [trips]);

  const handleCancelTrip = async (id) => {
    const { data } = await POST(`/api/myTrip/cancel/${id}`);
    console.log("Data:", data);
    setTrips(
      trips?.map((trip) =>
        // console.log("Trip ID:", trip.id);
        trip._id === id ? { ...trip, status: "Canceled" } : trip
      )
    );
    setSnackbar({
      open: true,
      message: "Trip canceled successfully",
      severity: "success",
    });
  };

  const handleOpenShareModal = (tripId) => {
    setShareLink(`http://yourtriplink.com/share/${tripId}`);
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => setShareModalOpen(false);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ height: "100%" }}>
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
          sx={{ marginBottom: "30px", color: "#0275d8", fontWeight: "750" }}
        >
          My Booked Trips
        </Typography>

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h5" sx={{ fontWeight: "600", color: "#333" }}>
            You have {trips?.length} trips booked
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            {counts.upcoming} Upcoming, {counts.past} Past, {counts.canceled}{" "}
            Canceled
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {loading ? ( // Show loading state while fetching data
            <Typography variant="body1" sx={{ color: "#555" }}>
              Loading your trips, please wait...
            </Typography>
          ) : trips?.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                padding: "50px 0",
                color: "#555",
                fontSize: "18px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#0275d8",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                No Trips Booked Yet
              </Typography>
              <Typography variant="body1">
                Plan your next adventure and create memories to cherish!
              </Typography>
            </Box>
          ) : (
            trips?.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip._id}>
                <Card
                  sx={{
                    position: "relative",
                    height: "300px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: 3,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundImage: `url(${trip?.trip?.imageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out",
                    },
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
                    <Box sx={{ marginBottom: "20px" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBottom: "4px" }}
                      >
                        {trip.trip.title}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "-20px",
                      }}
                    >
                      <FlightTakeoffIcon fontSize="small" />
                      <Typography variant="body2">
                        {trip?.trip?.itinerary?.length} Days
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        ${trip.trip.budget}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography variant="body2" sx={{ marginTop: "10px" }}>
                        Status: {trip.status}
                      </Typography>
                    </Box>
                    {trip.status === "booked" && (
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ marginTop: "12px" }}
                        onClick={() => handleCancelTrip(trip._id)}
                      >
                        Cancel Trip
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <Button
            href="/"
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              padding: "10px 20px",
              textTransform: "capitalize",
              fontSize: "16px",
            }}
          >
            Explore Trips
          </Button>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            sx={{
              padding: "10px 20px",
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            onClick={() => handleOpenShareModal(null)}
          >
            Share Your Journey
          </Button>
        </Box>

        <Modal open={isShareModalOpen} onClose={handleCloseShareModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Share Your Journey
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Shareable Link"
              value={shareLink}
              sx={{ marginBottom: "10px" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon sx={{ fontSize: "36px", color: "#3b5998" }} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon sx={{ fontSize: "36px", color: "#1DA1F2" }} />
              </a>
              <a
                href={`https://wa.me/?text=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon sx={{ fontSize: "36px", color: "#25D366" }} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon sx={{ fontSize: "36px", color: "#0077b5" }} />
              </a>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PinterestIcon sx={{ fontSize: "36px", color: "#E60023" }} />
              </a>
              <a
                href={`mailto:?subject=Check out my trip&body=${shareLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmailIcon sx={{ fontSize: "36px", color: "#D44638" }} />
              </a>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
      <Footer />
    </Box>
  );
};

export default MyTrips;
