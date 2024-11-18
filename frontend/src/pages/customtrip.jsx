import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const navigate = useNavigate();
  // const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  // const [budget, setBudget] = useState("");
  // const [days, setDays] = useState("");
  // const [tripPlan, setTripPlan] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // // const [selectedDestination, setSelectedDestination] = useState("");
  const [budgetOptions, setBudgetOptions] = useState({
    cheap: false,
    affordable: false,
    expensive: false,
  });
  const [activities, setActivities] = useState("");  // Activities input
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleGenerateTrip = async () => {
    setError("");
    setLoading(true);

    if (!selectedDestination || !activities || !Object.values(budgetOptions).includes(true)) {
      setError("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending payload:", {
        destination: selectedDestination,
        budget: Object.keys(budgetOptions).filter(option => budgetOptions[option]),
        activities,
      });
      const response = await axios.post("http://localhost:8000/api/customTrip", {
        destination: selectedDestination,
        budget: Object.keys(budgetOptions).filter(option => budgetOptions[option]),
        activities: activities,
      });
      console.log("Response:", response.data);
      setTripPlan(response.data.trip);
    } catch (err) {
      setError("Failed to generate trip. Please try again.");
      console.error("Error generating trip:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripPlan?._id) {
      navigate(`/trip/${tripPlan._id}`);
    }
  }, [tripPlan]);

  const handleBudgetChange = (event) => {
    const { name, checked } = event.target;
    setBudgetOptions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Create Custom Trip</h2>

      {/* Destination Selection */}
      <label>
        <strong>Destination</strong>
      </label>
      <input
        type="text"
        value={selectedDestination}
        onChange={(e) => setSelectedDestination(e.target.value)}
        placeholder="Enter your destination"
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Budget Input */}
      <label>
        <strong>Activities</strong>
      </label>
      <input
        type="text"
        value={activities}
        onChange={(e) => setActivities(e.target.value)}
        placeholder="Enter activities"
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      
      {/* Budget Options */}
      <label>
        <strong>Budget</strong>
      </label>
      <div style={{ marginBottom: "15px" }}>
        <label>
          <input
            type="checkbox"
            name="cheap"
            checked={budgetOptions.cheap}
            onChange={handleBudgetChange}
          />
          Cheap
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            name="affordable"
            checked={budgetOptions.affordable}
            onChange={handleBudgetChange}
          />
          Affordable
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            name="expensive"
            checked={budgetOptions.expensive}
            onChange={handleBudgetChange}
          />
          Expensive
        </label>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Generate Trip Button */}
      <button
        onClick={handleGenerateTrip}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Trip"}
      </button>

      {/* Display Generated Trip */}
    </div>
  );
};

export default CreateTrip;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreateTrip = () => {
//   const navigate = useNavigate();
//   const [destinations, setDestinations] = useState([]);  // Destinations list (unused, but kept for future use)
//   const [selectedDestination, setSelectedDestination] = useState("");
//   const [budgetOptions, setBudgetOptions] = useState({
//     cheap: false,
//     affordable: false,
//     expensive: false,
//   });
//   const [activities, setActivities] = useState("");  // Activities input
//   const [tripPlan, setTripPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // useEffect(() => {
//   //   // Fetch destinations (if needed in future)
//   //   axios
//   //     .get("/api/destinations")
//   //     .then((res) => setDestinations(res.data))
//   //     .catch((err) => console.error("Error fetching destinations:", err));
//   // }, []);

//   const handleGenerateTrip = async () => {
//     setError("");
//     setLoading(true);

//     if (!selectedDestination || !activities || !Object.values(budgetOptions).includes(true)) {
//       setError("Please fill in all the fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Sending payload:", {
//         destination: selectedDestination,
//         budget: Object.keys(budgetOptions).filter(option => budgetOptions[option]),
//         activities,
//       });
//       const response = await axios.get("http://localhost:8000/api/customTrip", {
//         destination: selectedDestination,
//         budget: Object.keys(budgetOptions).filter(option => budgetOptions[option]),
//         activities,
//       });
//       console.log("Response:", response.data);
//       setTripPlan(response.data.trip);
//     } catch (err) {
//       setError("Failed to generate trip. Please try again.");
//       console.error("Error generating trip:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (tripPlan?._id) {
//       navigate(`/trip/${tripPlan._id}`);
//     }
//   }, [tripPlan]);

//   const handleBudgetChange = (event) => {
//     const { name, checked } = event.target;
//     setBudgetOptions((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h2>Create Custom Trip</h2>

//       {/* Destination Selection */}
//       <label>
//         <strong>Destination</strong>
//       </label>
//       <input
//         type="text"
//         value={selectedDestination}
//         onChange={(e) => setSelectedDestination(e.target.value)}
//         placeholder="Enter your destination"
//         style={{
//           width: "100%",
//           padding: "10px",
//           margin: "10px 0",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//         }}
//       />

//       {/* Activities Input */}
//       <label>
//         <strong>Activities</strong>
//       </label>
//       <textarea
//         value={activities}
//         onChange={(e) => setActivities(e.target.value)}
//         placeholder="Describe your activities"
//         style={{
//           width: "100%",
//           padding: "10px",
//           margin: "10px 0",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//           height: "100px",
//         }}
//       />

//       {/* Budget Options */}
//       <label>
//         <strong>Budget</strong>
//       </label>
//       <div style={{ marginBottom: "15px" }}>
//         <label>
//           <input
//             type="checkbox"
//             name="cheap"
//             checked={budgetOptions.cheap}
//             onChange={handleBudgetChange}
//           />
//           Cheap
//         </label>
//         <label style={{ marginLeft: "10px" }}>
//           <input
//             type="checkbox"
//             name="affordable"
//             checked={budgetOptions.affordable}
//             onChange={handleBudgetChange}
//           />
//           Affordable
//         </label>
//         <label style={{ marginLeft: "10px" }}>
//           <input
//             type="checkbox"
//             name="expensive"
//             checked={budgetOptions.expensive}
//             onChange={handleBudgetChange}
//           />
//           Expensive
//         </label>
//       </div>

//       {/* Error Message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Generate Trip Button */}
//       <button
//         onClick={handleGenerateTrip}
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: "#007BFF",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Trip"}
//       </button>

//       {/* Display Generated Trip */}
//       {/* {tripPlan && (
//         <div style={{ marginTop: "30px" }}>
//           <h3>Generated Trip Itinerary for {tripPlan.destination}</h3>
//           <p>
//             <strong>Title:</strong> {tripPlan.title}
//           </p>
//           <p>
//             <strong>Budget:</strong> ${tripPlan.budget}
//           </p>
//           <p>
//             <strong>Highlights:</strong> {tripPlan.highlights?.join(", ")}
//           </p>
//           <h4>Itinerary</h4>
//           {tripPlan.itinerary?.map((day, index) => (
//             <div key={index} style={{ marginBottom: "20px" }}>
//               <h5>Day {day.day}</h5>
//               <p>
//                 <strong>Mode of Transportation:</strong>{" "}
//                 {day.modeOfTransportation}
//               </p>
//               <p>
//                 <strong>Hotel:</strong> {"sfdsjdgsjer8u"} ({day.hotel.location})
//               </p>
//               <p>
//                 <strong>Activities:</strong>
//               </p>
//               <ul>
//                 {day.activities.map((activity, idx) => (
//                   <li key={idx}>
//                     <strong>{activity.time}</strong> - {activity.description} (
//                     {activity.location})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default CreateTrip;
