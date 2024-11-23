// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// const CreateTrip = () => {
//   const navigate = useNavigate();
//   const [selectedDestination, setSelectedDestination] = useState("");
//   const [budgetOptions, setBudgetOptions] = useState({
//     cheap: false,
//     affordable: false,
//     expensive: false,
//   });
//   const [activities, setActivities] = useState("");
//   const [tripPlan, setTripPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGenerateTrip = async () => {
//     setError("");
//     setLoading(true);

//     if (!selectedDestination || !activities || !Object.values(budgetOptions).includes(true)) {
//       setError("Please fill in all the fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/api/customTrip", {
//         destination: selectedDestination,
//         budget: Object.keys(budgetOptions).filter(option => budgetOptions[option]),
//         activities: activities,
//       });
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
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//           Tell us your travel preferences <BeachAccessIcon className="w-8 h-8" />
//         </h1>
//         <p className="text-gray-600">
//           Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
//         </p>
//       </div>

//       <div className="space-y-8">
//         {/* Destination Input */}
//         <div>
//           <h2 className="text-xl font-semibold mb-3">What is destination of choice?</h2>
//           <input
//             type="text"
//             value={selectedDestination}
//             onChange={(e) => setSelectedDestination(e.target.value)}
//             placeholder="Select..."
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Activities Input */}
//         <div>
//           <h2 className="text-xl font-semibold mb-3">What activities interest you?</h2>
//           <input
//             type="text"
//             value={activities}
//             onChange={(e) => setActivities(e.target.value)}
//             placeholder="Enter activities you'd like to do..."
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Budget Options */}
//         <div>
//           <h2 className="text-xl font-semibold mb-3">What is Your Budget?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <label className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
//               budgetOptions.cheap ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
//             }`}>
//               <input
//                 type="checkbox"
//                 name="cheap"
//                 checked={budgetOptions.cheap}
//                 onChange={handleBudgetChange}
//                 className="hidden"
//               />
//               <div className="flex items-center gap-2">
//                 <AttachMoneyIcon className="w-6 h-6 text-green-500" />
//                 <div>
//                   <h3 className="font-semibold">Cheap</h3>
//                   <p className="text-sm text-gray-600">Stay conscious of costs</p>
//                 </div>
//               </div>
//             </label>

//             <label className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
//               budgetOptions.affordable ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
//             }`}>
//               <input
//                 type="checkbox"
//                 name="affordable"
//                 checked={budgetOptions.affordable}
//                 onChange={handleBudgetChange}
//                 className="hidden"
//               />
//               <div className="flex items-center gap-2">
//                 <AttachMoneyIcon className="w-6 h-6 text-yellow-500" />
//                 <div>
//                   <h3 className="font-semibold">Moderate</h3>
//                   <p className="text-sm text-gray-600">Keep cost on the average side</p>
//                 </div>
//               </div>
//             </label>

//             <label className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
//               budgetOptions.expensive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
//             }`}>
//               <input
//                 type="checkbox"
//                 name="expensive"
//                 checked={budgetOptions.expensive}
//                 onChange={handleBudgetChange}
//                 className="hidden"
//               />
//               <div className="flex items-center gap-2">
//                 <AttachMoneyIcon className="w-6 h-6 text-purple-500" />
//                 <div>
//                   <h3 className="font-semibold">Luxury</h3>
//                   <p className="text-sm text-gray-600">Don't worry about cost</p>
//                 </div>
//               </div>
//             </label>
//           </div>
//         </div>

//         {error && (
//           <div className="text-red-500 text-sm">{error}</div>
//         )}

//         <button
//           onClick={handleGenerateTrip}
//           disabled={loading}
//           className="w-full md:w-auto fixed bottom-6 right-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//         >
//           {loading ? "Generating..." : "Generate Trip"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateTrip;



import React, { useState, useEffect } from "react";
import axios from "axios";
import FOOTER from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Paper, Grid, Button } from '@mui/material';
import { BeachAccess as BeachAccessIcon, Flight as FlightIcon } from '@mui/icons-material';
import { MoneyOff as MoneyOffIcon, CurrencyExchange as CurrencyExchangeIcon, Star as StarIcon, Diamond as DiamondIcon } from '@mui/icons-material'; // New icons
import { Container as BootstrapContainer } from 'react-bootstrap';
import config from "../config";
const CreateTrip = () => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState("");
  const [budgetOptions, setBudgetOptions] = useState({
    cheap: false,
    affordable: false,
    expensive: false,
  });
  const [activities, setActivities] = useState("");
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
      const response = await axios.post(`${config.BACKEND_API}/api/customTrip`, {
        destination: selectedDestination,
        budget: Object.keys(budgetOptions).filter(option => budgetOptions[option]),
        activities: activities,
      });
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
    <div
      style={{ backgroundColor: '#f0f8ff' }}
    >
    <BootstrapContainer fluid style={{ backgroundColor: "#f0f8ff" }}>
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            // background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            borderRadius: 5,
            padding: 5,
            boxShadow: '0 12px 60px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#fff',
            marginBottom: 5,
            marginTop: 0.5,
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              sx={{
                color: '#0275d8',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              Let's Plan Your Perfect Trip <BeachAccessIcon sx={{ fontSize: 40, color: '#0275d8' }} />
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#555',
                maxWidth: 600,
                margin: '16px auto',
                // fontStyle: 'italic',
              }}
            >
              Enter your preferences, and we will craft a customized itinerary for your next adventure!
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  background: '#ffffff',
                  borderRadius: 3,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: '#0275d8' }}>
                  What is your dream destination?
                </Typography>
                <input
                  type="text"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  placeholder="Enter destination..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #bdbdbd',
                    fontSize: '16px',
                    backgroundColor: '#fafafa',
                    color: '#333',
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      border: '2px solid #00796b',
                    }
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  background: '#ffffff',
                  borderRadius: 3,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: '#0275d8' }}>
                  What activities do you enjoy?
                </Typography>
                <textarea
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  placeholder="Enter activities you'd like to include..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #bdbdbd',
                    fontSize: '16px',
                    minHeight: '100px',
                    resize: 'vertical',
                    backgroundColor: '#fafafa',
                    color: '#333',
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      border: '2px solid #00796b',
                    }
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  background: '#ffffff',
                  borderRadius: 3,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: '#0275d8' }}>
                  What is Your Budget?
                </Typography>
                <Grid container spacing={2}>
                  {[ 
                    { name: 'cheap', label: 'Budget-Friendly', icon: <MoneyOffIcon sx={{ color: '#388e3c' }} />, description: 'Affordable options for everyone.' },
                    { name: 'affordable', label: 'Moderate', icon: <CurrencyExchangeIcon sx={{ color: '#ff9800' }} />, description: 'Great options for a middle ground.' },
                    { name: 'expensive', label: 'Luxury', icon: <DiamondIcon sx={{ color: '#8e24aa' }} />, description: 'Pamper yourself with luxury.' }
                  ].map((budget) => (
                    <Grid item xs={12} sm={4} key={budget.name}>
                      <Paper
                        elevation={budgetOptions[budget.name] ? 5 : 1}
                        sx={{
                          p: 3,
                          border: budgetOptions[budget.name] ? '2px solid #00796b' : '1px solid #e0e0e0',
                          borderRadius: 2,
                          cursor: 'pointer',
                          backgroundColor: budgetOptions[budget.name] ? '#e0f2f1' : '#ffffff',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => handleBudgetChange({ target: { name: budget.name, checked: !budgetOptions[budget.name] } })}
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          {budget.icon}
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {budget.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {budget.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant="contained"
                  onClick={handleGenerateTrip}
                  disabled={loading}
                  startIcon={<FlightIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #00796b 30%, #00695c 90%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #004d40 30%, #00796b 90%)',
                    }
                  }}
                >
                  {loading ? 'Generating Trip...' : 'Generate Trip'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </BootstrapContainer>
     <FOOTER sx={{width: "100%", backgroundColor: "#333", color: "white", padding: "20px", textAlign: "center", position: "absolute", bottom: 0}}/>
     </div>
  );
};

export default CreateTrip;