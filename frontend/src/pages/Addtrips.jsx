// import React, { useState } from "react";
// import FOOTER from "../components/Footer";
// import "../CSS/Addtrips.css"; // Updated styles are in this file

// function TripForm() {
//   const [trip, setTrip] = useState({
//     title: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     itinerary: [
//       {
//         day: 1,
//         modeOfTransportation: "",
//         hotel: {
//           name: "",
//           location: "",
//         },
//         activities: [
//           {
//             time: "",
//             description: "",
//             location: "",
//           },
//         ],
//       },
//     ],
//     budget: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setTrip({ ...trip, [name]: value });
//   };

//   const handleItineraryChange = (index, field, value) => {
//     const updatedItinerary = [...trip.itinerary];
//     updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
//     setTrip({ ...trip, itinerary: updatedItinerary });
//   };

//   const addActivity = (dayIndex) => {
//     const updatedItinerary = [...trip.itinerary];
//     updatedItinerary[dayIndex].activities.push({
//       time: "",
//       description: "",
//       location: "",
//     });
//     setTrip({ ...trip, itinerary: updatedItinerary });
//   };

//   const addDay = () => {
//     setTrip({
//       ...trip,
//       itinerary: [
//         ...trip.itinerary,
//         {
//           day: trip.itinerary.length + 1,
//           modeOfTransportation: "",
//           hotel: {
//             name: "",
//             location: "",
//           },
//           activities: [
//             {
//               time: "",
//               description: "",
//               location: "",
//             },
//           ],
//         },
//       ],
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(trip); // Replace with backend API call if needed
//   };

//   return (
//     <div className="trip-form-container">
//       <h1 className="trip-form-title">Trip Planner</h1>
//       <button
//         className="Button_submit"
//         style={{
//           position: "absolute",
//           top: "20px",
//           right: "20px",
//           transition: "background-color 0.3s ease",
//         }}
//         onClick={() => (window.location.href = "/")}
//       >
//         Back to Home
//       </button>
//       <form onSubmit={handleSubmit} className="trip-form">
//         <div className="trip-form-group">
//           <label className="trip-form-label">
//             Title:
//             <input
//               type="text"
//               name="title"
//               value={trip.title}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>
//         </div>
//         <div className="trip-form-group">
//           <label className="trip-form-label">
//             Destination:
//             <input
//               type="text"
//               name="destination"
//               value={trip.destination}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>
//         </div>
//         <div className="trip-date-budget-group">
//           <label className="trip-form-label">
//             Start Date:
//             <input
//               type="date"
//               name="startDate"
//               value={trip.startDate}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>
//           <label className="trip-form-label">
//             End Date:
//             <input
//               type="date"
//               name="endDate"
//               value={trip.endDate}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>
//           <label className="trip-form-label">
//             Budget:
//             <input
//               type="number"
//               name="budget"
//               value={trip.budget}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>
//           <label className="trip-form-label">
//             Trip Highlights:
//             <input
//               type="text"
//               name="highlights"
//               value={trip.highlights}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>

//           <label className="trip-form-label">
//             Included Services
//             <input
//               type="text"
//               name="servicesIncluded"
//               value={trip.servicesIncluded}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>

//           <label className="trip-form-label">
//             Image URL:
//             <input
//               type="text"
//               name="imageURL"
//               value={trip.imageURL}
//               onChange={handleInputChange}
//               className="trip-form-input"
//               required
//             />
//           </label>
//         </div>

//         <div className="trip-itinerary-container">
//           <div className="title-ininerary">
//             <h2 className="trip-itinerary-title">Itinerary</h2>
//           </div>
//           {trip.itinerary.map((day, index) => (
//             <div key={index} className="trip-itinerary-day">
//               <h3 className="trip-itinerary-day-title">Day {day.day}</h3>
//               <div className="trip-itinerary-group">
//                 <label className="trip-form-label">
//                   Mode of Transportation:
//                   <select
//                     value={day.modeOfTransportation}
//                     onChange={(e) =>
//                       handleItineraryChange(
//                         index,
//                         "modeOfTransportation",
//                         e.target.value
//                       )
//                     }
//                     className="trip-form-select"
//                   >
//                     <option value="">Select</option>
//                     <option value="car">Car</option>
//                     <option value="bus">Bus</option>
//                     <option value="train">Train</option>
//                     <option value="plane">Plane</option>
//                     <option value="boat">Boat</option>
//                     <option value="walking">Walking</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </label>
//               </div>
//               <div className="trip-itinerary-group">
//                 <label className="trip-form-label">
//                   Hotel Name:
//                   <input
//                     type="text"
//                     value={day.hotel.name}
//                     onChange={(e) => {
//                       const updatedHotel = {
//                         ...day.hotel,
//                         name: e.target.value,
//                       };
//                       handleItineraryChange(index, "hotel", updatedHotel);
//                     }}
//                     className="trip-form-input"
//                   />
//                 </label>
//                 <label className="trip-form-label">
//                   Hotel Location:
//                   <input
//                     type="text"
//                     value={day.hotel.location}
//                     onChange={(e) => {
//                       const updatedHotel = {
//                         ...day.hotel,
//                         location: e.target.value,
//                       };
//                       handleItineraryChange(index, "hotel", updatedHotel);
//                     }}
//                     className="trip-form-input"
//                   />
//                 </label>
//               </div>

//               <h4 className="trip-activities-title">Activities</h4>
//               {day.activities.map((activity, aIndex) => (
//                 <div key={aIndex} className="trip-activity-group">
//                   <label className="trip-form-label">
//                     Time:
//                     <input
//                       type="time"
//                       value={activity.time}
//                       onChange={(e) => {
//                         const updatedActivities = [...day.activities];
//                         updatedActivities[aIndex] = {
//                           ...activity,
//                           time: e.target.value,
//                         };
//                         handleItineraryChange(
//                           index,
//                           "activities",
//                           updatedActivities
//                         );
//                       }}
//                       className="trip-form-input"
//                     />
//                   </label>
//                   <label className="trip-form-label">
//                     Description:
//                     <input
//                       type="text"
//                       value={activity.description}
//                       onChange={(e) => {
//                         const updatedActivities = [...day.activities];
//                         updatedActivities[aIndex] = {
//                           ...activity,
//                           description: e.target.value,
//                         };
//                         handleItineraryChange(
//                           index,
//                           "activities",
//                           updatedActivities
//                         );
//                       }}
//                       className="trip-form-input"
//                     />
//                   </label>
//                   <label className="trip-form-label">
//                     Location:
//                     <input
//                       type="text"
//                       value={activity.location}
//                       onChange={(e) => {
//                         const updatedActivities = [...day.activities];
//                         updatedActivities[aIndex] = {
//                           ...activity,
//                           location: e.target.value,
//                         };
//                         handleItineraryChange(
//                           index,
//                           "activities",
//                           updatedActivities
//                         );
//                       }}
//                       className="trip-form-input"
//                     />
//                   </label>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="trip-form-button add-activity-button"
//                 onClick={() => addActivity(index)}
//               >
//                 Add Activity
//               </button>
//             </div>
//           ))}
//         </div>

//         <button
//           type="button"
//           className="trip-form-button add-day-button"
//           onClick={addDay}
//         >
//           Add Day
//         </button>
//         <button type="submit" className="trip-form-button submit-button">
//           Save Trip
//         </button>

//         <FOOTER />
//       </form>
//     </div>
//   );
// }

// export default TripForm;

import React, { useState } from "react";
import FOOTER from "../components/Footer";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import "../CSS/Addtrips.css"; // Updated styles are in this file
import useAPI from "../hooks/useAPI"
import { ToastContainer, toast } from "react-toastify";

function TripForm() {
  const {POST} = useAPI()
  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    itinerary: [
      {
        day: 1,
        modeOfTransportation: "",
        hotel: {
          name: "",
          location: "",
        },
        activities: [
          {
            time: "",
            description: "",
            location: "",
          },
        ],
      },
    ],
    budget: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleItineraryChange = (index, field, value) => {
    const updatedItinerary = [...trip.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setTrip({ ...trip, itinerary: updatedItinerary });
  };

  const addActivity = (dayIndex) => {
    const updatedItinerary = [...trip.itinerary];
    updatedItinerary[dayIndex].activities.push({
      time: "",
      description: "",
      location: "",
    });
    setTrip({ ...trip, itinerary: updatedItinerary });
  };

  const addDay = () => {
    setTrip({
      ...trip,
      itinerary: [
        ...trip.itinerary,
        {
          day: trip.itinerary.length + 1,
          modeOfTransportation: "",
          hotel: {
            name: "",
            location: "",
          },
          activities: [
            {
              time: "",
              description: "",
              location: "",
            },
          ],
        },
      ],
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // console.log(trip); // Replace with backend API call if needed
    try{
    const tripData = {
      title: trip.title,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget,
      highlights: trip.highlights,
      servicesIncluded: trip.servicesIncluded,
      imageURL: trip?.imageURL,
      itinerary: trip.itinerary,
    };
    // tripData.JSON.stringify();
    const response = await POST("/api/trip",tripData);
    toast.success("Trip submitted successfully!");
    setTrip({
      title: "",
      destination: "",
      startDate: "",
      endDate: "",
      itinerary: [
        {
          day: 1,
          modeOfTransportation: "",
          hotel: {
            name: "",
            location: "",
          },
          activities: [
            {
              time: "",
              description: "",
              location: "",
            },
          ],
        },
      ],
      budget: "",
      highlights: "",
      servicesIncluded: "",
      imageURL: "",
    });
  }catch(error){
    console.error("Error submitting trip:", error);
    toast.error("Failed to submit trip. Please try again.");
  }
    };
  

  return (
    <>
    
      <div
        className="trip-form-container"
        style={{ backgroundColor: "#f0f8ff", width: "100%", height: "100%" }}
      >
        <ToastContainer />
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="trip-form-title"
          style={{ color: "#0275d8", fontWeight: "bold" }}
        >
          Add New Trip
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="trip-form"
          style={{
            maxWidth: "900px",
            margin: "auto",
            marginBottom: "60px",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField  
                label="Trip Title"
                name="title"
                value={trip.title}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                className="trip-form-input"
                InputProps={{
                  style: { borderRadius: "10px", backgroundColor: "#f5f5f5" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destination"
                name="destination"
                value={trip.destination}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                className="trip-form-input"
                InputProps={{
                  style: { borderRadius: "10px", backgroundColor: "#f5f5f5" },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget"
                name="budget"
                value={trip.budget}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                type="number"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Highlights"
                name="highlights"
                value={trip.highlights}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Services Included"
                name="servicesIncluded"
                value={trip.servicesIncluded}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URL"
                name="imageURL"
                value={trip?.imageURL}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
          </Grid>

          <Box
            className="trip-itinerary-container"
            style={{ marginTop: "30px" }}
          >
            <Typography
              variant="h5"
              className="trip-itinerary-title"
              style={{
                color: "#0275d8",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Trip Itinerary
            </Typography>
            {trip.itinerary.map((day, index) => (
              <div
                key={index}
                className="trip-itinerary-day"
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ color: "#0275d8", fontWeight: "bold" }}
                >
                  Day {day.day}
                </Typography>

                <Grid container spacing={3} style={{ marginTop: "20px" }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Mode of Transportation</InputLabel>
                      <Select
                        value={day.modeOfTransportation}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "modeOfTransportation",
                            e.target.value
                          )
                        }
                        label="Mode of Transportation"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="car">Car</MenuItem>
                        <MenuItem value="bus">Bus</MenuItem>
                        <MenuItem value="train">Train</MenuItem>
                        <MenuItem value="plane">Plane</MenuItem>
                        <MenuItem value="boat">Boat</MenuItem>
                        <MenuItem value="walking">Walking</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Hotel Name"
                      value={day.hotel.name}
                      onChange={(e) => {
                        const updatedHotel = {
                          ...day.hotel,
                          name: e.target.value,
                        };
                        handleItineraryChange(index, "hotel", updatedHotel);
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: "20px" }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Hotel Location"
                      value={day.hotel.location}
                      onChange={(e) => {
                        const updatedHotel = {
                          ...day.hotel,
                          location: e.target.value,
                        };
                        handleItineraryChange(index, "hotel", updatedHotel);
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <div className="trip-activities" style={{ marginTop: "30px" }}>
                  {day.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} style={{ marginBottom: "15px" }}>
                      <Typography variant="body1" style={{ color: "#5bc0de" }}>
                        Activity {activityIndex + 1}
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            label="Time"
                            value={activity.time}
                            onChange={(e) => {
                              const updatedActivities = [...day.activities];
                              updatedActivities[activityIndex].time =
                                e.target.value;
                              handleItineraryChange(
                                index,
                                "activities",
                                updatedActivities
                              );
                            }}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            label="Description"
                            value={activity.description}
                            onChange={(e) => {
                              const updatedActivities = [...day.activities];
                              updatedActivities[activityIndex].description =
                                e.target.value;
                              handleItineraryChange(
                                index,
                                "activities",
                                updatedActivities
                              );
                            }}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            label="Location"
                            value={activity.location}
                            onChange={(e) => {
                              const updatedActivities = [...day.activities];
                              updatedActivities[activityIndex].location =
                                e.target.value;
                              handleItineraryChange(
                                index,
                                "activities",
                                updatedActivities
                              );
                            }}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addActivity(index)}
                  style={{
                    marginLeft: "330px",
                    marginTop: "20px",
                    backgroundColor: "#d9534f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Add Activity
                </Button>
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={addDay}
              style={{
                marginLeft: "370px",
                marginTop: "30px",
                backgroundColor: "#37474f",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Add Day
            </Button>
          </Box>

         
         

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "15px",
              borderRadius: "25px",
              fontSize: "18px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00796b 30%, #00695c 90%)",
            }}
          >
            Save Trip
          </Button>
        </form>
      </div>
      <FOOTER
        sx={{
          width: "100%",
          backgroundColor: "#333",
          color: "white",
          padding: "20px",
          textAlign: "center",
          position: "absolute",
          bottom: 0,
        }}
      />
    </>
  );
}

export default TripForm;
