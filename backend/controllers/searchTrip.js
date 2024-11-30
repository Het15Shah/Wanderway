const Trip = require('../models/trip');

async function searchTrip(req, res) {
    // Log the query parameters
    console.log(req.query);
    const { destination, days, maxBudget } = req.query;

    // Build query object based on filters
    let query = {};

    // Filter by destination (case-insensitive)
    if (destination) {
        query.destination = { $regex: new RegExp(destination, 'i') }; // Case-insensitive match
    }

    // Filter by budget
    if (maxBudget) {
        const roundedBudget = Math.round(parseFloat(maxBudget));
        if (roundedBudget < 0) {
            return res.status(400).json({ message: "Budget must be a positive value." });
        }
        query.budget = { $lte: roundedBudget };
    }

    try {
        // Fetch all trips matching the query
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