// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Card, Typography, Grid, Button, Snackbar } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

// // const MyTrips = () => {
// //   const [trips, setTrips] = useState([]);
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: "",
// //     severity: "",
// //   });

// //   // Fetch trips booked by the user
// //   useEffect(() => {
// //     axios
// //       .get("/api/my-trips") // Adjust this endpoint to match your backend route
// //       .then((response) => setTrips(response.data))
// //       .catch((error) => console.error("Error fetching trips", error));
// //   }, []);

// //   // Handle trip cancellation
// //   const handleCancelTrip = (id) => {
// //     axios
// //       .put(`/api/my-trips/cancel-trip/${id}`) // Adjust this endpoint to match your backend route
// //       .then((response) => {
// //         // Update the trip's status in the local state
// //         setTrips(
// //           trips.map((trip) =>
// //             trip._id === id ? { ...trip, status: "canceled" } : trip
// //           )
// //         );
// //         setSnackbar({
// //           open: true,
// //           message: response.data.message,
// //           severity: "success",
// //         });
// //       })
// //       .catch((error) => {
// //         console.error("Error canceling trip", error);
// //         setSnackbar({
// //           open: true,
// //           message: "Failed to cancel trip",
// //           severity: "error",
// //         });
// //       });
// //   };

//   // Snackbar close handler
//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

//   return (
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
//         sx={{ marginBottom: "30px", color: "#283593", fontWeight: "700" }}
//       >
//         My Trips
//       </Typography>
//       <Grid container spacing={2}>
//         {trips.map((trip) => (
//           <Grid item xs={12} sm={6} md={4} key={trip._id}>
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
//                 backgroundImage: `url(${trip.trip.imageUrl})`, // Assuming imageUrl is in the Trip model
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
//                   {trip.trip.title}
//                 </Typography>
//                 <Typography variant="body2">
//                   Booked on: {new Date(trip.bookingDate).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="body2" sx={{ marginBottom: "8px" }}>
//                   Status: {trip.status === "canceled" ? "Canceled" : "Booked"}
//                 </Typography>
//                 {trip.status === "booked" && (
//                   <Button
//                     variant="contained"
//                     color="error"
//                     sx={{ marginTop: "8px" }}
//                     onClick={() => handleCancelTrip(trip._id)}
//                   >
//                     Cancel Trip
//                   </Button>
//                 )}
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Toaster Notification */}
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
//   );
// };

// export default MyTrips;

import React, { useState } from "react";
import { Box, Card, Typography, Grid, Button, Snackbar } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import MuiAlert from "@mui/material/Alert";
import {
  Calendar,
  Filter,
  Download,
  List,
  Grid as GridIcon,
  Search,
  SlidersHorizontal
} from "lucide-react";

const MyTrips = () => {
  // Original trips data
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "Paris Getaway",
      price: "$1500",
      duration: "5 Days",
      imageUrl: "https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-videoSixteenByNine3000.jpg",
      status: "booked",
    },
    {
      id: 2,
      title: "Adventure in Bali",
      price: "$1200",
      duration: "7 Days",
      imageUrl: "https://images.pexels.com/photos/2587004/pexels-photo-2587004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      status: "booked",
    },
    {
      id: 3,
      title: "Explore Japan",
      price: "$1800",
      duration: "6 Days",
      imageUrl: "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      status: "canceled",
    },
  ]);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  // Handle trip cancellation (original function)
  const handleCancelTrip = (id) => {
    setTrips(trips.map(trip => 
      trip.id === id ? { ...trip, status: 'canceled' } : trip
    ));
    setSnackbar({ open: true, message: "Trip canceled successfully", severity: "success" });
  };

  // Original snackbar close handler
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Filter trips based on search query
  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Enhanced Header Section */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "30px",
        flexWrap: "wrap",
        gap: 2
      }}>
        <Typography
          variant="h4"
          sx={{
            color: "#283593",
            fontWeight: "700",
          }}
        >
          My Booked Trips
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ 
          display: "flex", 
          gap: 2,
          flexWrap: "wrap"
        }}>
          <Button
            variant="outlined"
            startIcon={<Calendar className="w-4 h-4" />}
            sx={{ textTransform: 'none' }}
          >
            Calendar View
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download className="w-4 h-4" />}
            sx={{ textTransform: 'none' }}
          >
            Export Trips
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ 
        display: "flex", 
        gap: 2, 
        marginBottom: 3,
        flexWrap: "wrap"
      }}>
        {/* Search Input */}
        <Box sx={{ 
          flex: 1, 
          minWidth: "200px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "8px 16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              marginLeft: "8px",
              width: "100%",
              fontSize: "14px"
            }}
          />
        </Box>

        {/* View Toggle and Filter */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={viewMode === 'grid' ? "contained" : "outlined"}
            onClick={() => setViewMode('grid')}
            sx={{ minWidth: "40px", padding: "8px" }}
          >
            <GridIcon className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? "contained" : "outlined"}
            onClick={() => setViewMode('list')}
            sx={{ minWidth: "40px", padding: "8px" }}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="outlined"
            startIcon={<SlidersHorizontal className="w-4 h-4" />}
            sx={{ textTransform: 'none' }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Box sx={{ 
        display: "flex", 
        gap: 2, 
        marginBottom: 3,
        flexWrap: "wrap"
      }}>
        {[
          { label: "Total Trips", value: trips.length },
          { label: "Active Trips", value: trips.filter(t => t.status === "booked").length },
          { label: "Canceled", value: trips.filter(t => t.status === "canceled").length }
        ].map((stat, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "white",
              padding: "16px 24px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              flex: 1,
              minWidth: "150px",
              textAlign: "center"
            }}
          >
            <Typography variant="h6" sx={{ color: "#283593", fontWeight: "bold" }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Original Trips Grid */}
      <Grid container spacing={2}>
        {filteredTrips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip.id}>
            <Card
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
                backgroundImage: `url(${trip.imageUrl})`,
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
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                  {trip.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlightTakeoffIcon fontSize="small" />
                  <Typography variant="body2">{trip.duration}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {trip.price}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ marginTop: "8px" }}>
                  Status: {trip.status === 'canceled' ? 'Canceled' : 'Booked'}
                </Typography>
                {trip.status === 'booked' && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginTop: "8px" }}
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

      {/* Original Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default MyTrips;