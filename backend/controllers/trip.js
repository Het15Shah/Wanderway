const Trip = require("../models/trip");

async function addNewTrip(req, res) {
  try {

    console.log(req.body);
    const trip = new Trip(req.body);
    await trip.save();

    // const trip = new Trip(req.body); // create new Trip from user inputs
    // console.log(trip);



    // await trip.save(); // save the trip to database
    // const savedTrip = await trip.save();
    // console.log("mnsdf");
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllTrip(req, res) {
  try {
    const trips = await Trip.find(); // finding all trips
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTripById(req, res) {
  try {
    const trip = await Trip.findById(req.params.id); // find trip from Trip database using tripId provided by user
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTripById(req, res) {
  try {
    // Fetch trip from Trip database and deleting it
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip)
      return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addNewTrip,
  deleteTripById,
  getAllTrip,
  getTripById,
};
