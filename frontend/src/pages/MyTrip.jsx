// import React, { useState } from "react";
// import { Box, Card, Typography, Grid, Button, Snackbar } from "@mui/material";
// import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
// import MuiAlert from "@mui/material/Alert";
// import axios from "axios";
// import Footer from "../components/Footer";
// const MyTrips = () => {
//   // Dummy data for trips
//   const [trips, setTrips] = useState([
//     {
//       id: 1,
//       title: "Paris Getaway",
//       price: "$1500",
//       duration: "5 Days",
//       imageUrl:
//         "https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-videoSixteenByNine3000.jpg",
//       status: "booked",
//     },
//     {
//       id: 2,
//       title: "Adventure in Bali",
//       price: "$1200",
//       duration: "7 Days",
//       imageUrl:
//         "https://images.pexels.com/photos/2587004/pexels-photo-2587004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
//       status: "booked",
//     },
//     {
//       id: 3,
//       title: "Explore Japan",
//       price: "$1800",
//       duration: "6 Days",
//       imageUrl:
//         "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//       status: "canceled",
//     },
//   ]);

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "",
//   });

//   // Handle trip cancellation
//   // const handleCancelTrip = async (id) => {
//   //   try {
//   //     const response = await axios.put(`/api/myTrip/cancel/${id}`);

//   //     if (response.status === 200) {
//   //       // Update the state to reflect the trip cancellation on the frontend
//   //       setTrips(
//   //         trips.map((trip) =>
//   //           trip.id === id ? { ...trip, status: "canceled" } : trip
//   //         )
//   //       );
//   //       setSnackbar({
//   //         open: true,
//   //         message: "Trip canceled successfully",
//   //         severity: "success",
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error canceling the trip:", error);
//   //     setSnackbar({
//   //       open: true,
//   //       message: "Failed to cancel trip. Please try again.",
//   //       severity: "error",
//   //     });
//   //   }
//   // };
//   const handleCancelTrip = (id) => {
//     setTrips(
//       trips.map((trip) =>
//         trip.id === id ? { ...trip, status: "canceled" } : trip
//       )
//     );
//     setSnackbar({
//       open: true,
//       message: "Trip canceled successfully",
//       severity: "success",
//     });
//   };
//   // Snackbar close handler
//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

//   return (
//     <Box
//       sx={{

//         height: "100%",
//       }}
//     >
//     <Box
//       sx={{
//         padding: "50px 20px",
//         textAlign: "center",
//         fontFamily: "Arial, sans-serif",
//         color: "#333",
//         backgroundColor: "#f5f7fa",
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{
//           marginBottom: "30px",
//           color: "#ffcc00",
//           fontWeight: "900",
//         }}
//       >
//         My Booked Trips
//       </Typography>
//       <Grid container spacing={2}>
//         {trips.map((trip) => (
//           <Grid item xs={12} sm={6} md={4} key={trip.id}>
//             <Card
//               sx={{
//                 position: "relative",
//                 height: "250px",
//                 borderRadius: "16px",
//                 overflow: "hidden",
//                 boxShadow: 3,
//                 color: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textAlign: "center",
//                 backgroundImage: `url(${trip.imageUrl})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   backgroundColor: "rgba(0, 0, 0, 0.5)",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: "bold", marginBottom: "8px" }}
//                 >
//                   {trip.title}
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                   <FlightTakeoffIcon fontSize="small" />
//                   <Typography variant="body2">{trip.duration}</Typography>
//                   <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//                     {trip.price}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body2" sx={{ marginTop: "8px" }}>
//                   Status: {trip.status === "canceled" ? "Canceled" : "Booked"}
//                 </Typography>
//                 {trip.status === "booked" && (
//                   <Button
//                     variant="contained"
//                     color="error"
//                     sx={{ marginTop: "8px" }}
//                     onClick={() => handleCancelTrip(trip.id)}
//                   >
//                     Cancel Trip
//                   </Button>
//                 )}
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Snackbar Notification */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//       >
//         <MuiAlert
//           elevation={6}
//           variant="filled"
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//         >
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </Box>
//     <Footer />
//   </Box>
//   );
// };

// export default MyTrips;
import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Snackbar,
  Chip,
  Modal,
  TextField,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import MuiAlert from "@mui/material/Alert";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../components/Footer";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  PinterestShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  PinterestIcon,
  TelegramIcon,
} from "react-share";

const MyTrips = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "Paris Getaway",
      price: "$1500",
      duration: "5 Days",
      imageUrl:
        "https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-videoSixteenByNine3000.jpg",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Adventure in Bali",
      price: "$1200",
      duration: "7 Days",
      imageUrl:
        "https://images.pexels.com/photos/2587004/pexels-photo-2587004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Explore Japan",
      price: "$1800",
      duration: "6 Days",
      imageUrl:
        "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      status: "Past",
    },
  ]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleCancelTrip = (id) => {
    setTrips(
      trips.map((trip) =>
        trip.id === id ? { ...trip, status: "Canceled" } : trip
      )
    );
    setSnackbar({
      open: true,
      message: "Trip canceled successfully",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleOpenShareModal = () => setShareModalOpen(true);
  const handleCloseShareModal = () => setShareModalOpen(false);

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
          sx={{ marginBottom: "30px", color: "#ffcc00", fontWeight: "900" }}
        >
          My Booked Trips
        </Typography>

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h5" sx={{ fontWeight: "600", color: "#333" }}>
            You have {trips.length} trips booked
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            Upcoming: {trips.filter((trip) => trip.status === "Upcoming").length} | Past: {trips.filter((trip) => trip.status === "Past").length} | Canceled: {trips.filter((trip) => trip.status === "Canceled").length}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
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
                  backgroundImage: `url(${trip.imageUrl})`,
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
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginBottom: "12px" }}
                  >
                    {trip.title}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <FlightTakeoffIcon fontSize="small" />
                    <Typography variant="body1">{trip.duration}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {trip.price}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ marginTop: "12px" }}>
                    Status: {trip.status}
                  </Typography>
                  {trip.status === "Upcoming" && (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginTop: "12px" }}
                      onClick={() => handleCancelTrip(trip.id)}
                    >
                      Cancel Trip
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ marginTop: "20px" }}>
          <Button
            href="/"
            variant="outlined"
            className="Button_submit"
            startIcon={<AddIcon />}
          >
            Explore Other Trips
          </Button>

          <Button
            variant="contained"
            className="Button_submit"
            startIcon={<ShareIcon />}
            onClick={handleOpenShareModal}
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
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Share Your Journey
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Shareable Link"
              value="http://yourtriplink.com"
            />
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <FacebookShareButton
                url="http://yourtriplink.com"
                quote="Check out my amazing trip!"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url="http://yourtriplink.com"
                title="Check out my amazing trip!"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url="http://yourtriplink.com"
                title="Check out my amazing trip!"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <EmailShareButton
                url="http://yourtriplink.com"
                subject="Check out my trip!"
                body="I had an amazing time on my trip! You should check it out."
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <RedditShareButton
                url="http://yourtriplink.com"
                title="Check out my amazing trip!"
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
              <PinterestShareButton
                url="http://yourtriplink.com"
                media="https://via.placeholder.com/150"
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <TelegramShareButton
                url="http://yourtriplink.com"
                title="Check out my amazing trip!"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
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