const Trip = require("../models/trip");

async function searchTrip(req, res) {
  console.log(req.query);
  const { destination, days, maxBudget } = req.query.params;

  // Build query object based on filters
  let query = {};

  // Case-insensitive filter by destination
  if (destination) {
    query.destination = { $regex: new RegExp(`^${destination}$`, "i") }; // 'i' makes it case-insensitive
  }

  // Filter by positive budget
  if (maxBudget) {
    const budgetValue = parseInt(maxBudget, 10);
    if (budgetValue > 0) {
      query.budget = { $lte: budgetValue };
    } else {
      return res.status(400).json({ message: "Budget must be a positive number." });
    }
  }

  try {
    // Fetch all trips and calculate days by itinerary length
    let trips = await Trip.find(query);

    // Apply days filter based on itinerary length
    if (days) {
      const targetDays = parseInt(days, 10);
      trips = trips.filter((trip) => trip.itinerary.length <= targetDays);
    }

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { searchTrip };
