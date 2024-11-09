const Trip = require('../model/trip') 

async function addNewTrip(req, res) {
    try {
      const trip = new Trip(req.body);
      const savedTrip = await trip.save();
      res.status(201).json(savedTrip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

async function getAllTrip(req, res) {
    try {
      const trips = await Trip.find();
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


async function getTripById (req, res) {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) return res.status(404).json({ message: 'Trip not found' });
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

async function searchTrip (req, res)  {
    const { destination, minDays, maxDays, minBudget, maxBudget } = req.query;
  
    // Build query object based on filters
    let query = {};
  
    // Filter by destination if provided
    if (destination) {
      query.destination = destination;
    }
  
    // Filter by budget range if provided
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = parseInt(minBudget, 10);
      if (maxBudget) query.budget.$lte = parseInt(maxBudget, 10);
    }
  
    try {
      // Fetch trips and calculate days by itinerary length
      let trips = await Trip.find(query);
  
      // Apply days filter based on itinerary length
      if (minDays || maxDays) {
        trips = trips.filter((trip) => {
          const days = trip.itinerary.length;
          return (
            (!minDays || days >= parseInt(minDays, 10)) &&
            (!maxDays || days <= parseInt(maxDays, 10))
          );
        });
      }
  
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }

async function deleteTripById (req, res){
    try {
      const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
      if (!deletedTrip) return res.status(404).json({ message: 'Trip not found' });
      res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

module.exports = {
    addNewTrip,
    searchTrip,
    deleteTripById,
    getAllTrip,
    getTripById
}