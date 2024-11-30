const Trip = require('../models/trip')

async function searchTrip (req, res)  {
    //  console.log("Search Trip Called");
    console.log(req.query);
    const { destination, days, maxBudget } = req.query.params;
  //  console.log("Destination", destination);
   
    // Build query object based on filters
    let query = {};
  
    // Filter by destination provided
    if (destination) {
      // console.log("Searching For ", destination);
      query.destination = destination;
    }
  
    // Filter by budget
    if (maxBudget) {
      query.budget = { $lte: parseInt(maxBudget, 10) };
    }
  
    try {
      // Fetch all trips and calculate days by itinerary length
      let trips = await Trip.find(query);
  
      // Apply days filter based on itinerary length
      if (days) {
        const targetDays = parseInt(days, 10);
        trips = trips.filter((trip) => trip.itinerary.length <= targetDays);
      }
      // console.log("Trips", trips);
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
module.exports = {searchTrip}