const MyTrip = require("../models/myTrip");
const Trip = require("../models/trip");
const mongoose = require("mongoose");
async function cancelTrip(req, res) {
  try {
    const { id } = req.params;

    // Update the status to 'canceled' which triggers the pre-save middleware
    const canceledTrip = await MyTrip.findByIdAndUpdate(
      id,
      { status: "canceled" },
      { new: true }
    );

    if (!canceledTrip)
      return res.status(404).json({ message: "Booking not found" });

    return res.json({ message: "Trip canceled successfully", canceledTrip });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function bookTrip(req, res) {
  try {
    const tripId = req.params.tripId;
    console.log(tripId);

    const userId = req.user._id;
    console.log(req.user);

    const newTrip = await MyTrip.create({
      user: userId,
      trip: tripId,
    });
    // console.log(newTrip);

    return res.status(200).json({ message: "Trip Booked Successfully!!" });
  } catch (error) {
    console.error("Error booking trip:", error);
    return res
      .status(500)
      .json({ message: "Failed to book trip", error: error.message });
  }
}

async function allbookedtrips(req, res) {
  try {
    const userId = req.user?._id;
    // console.log(userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const trips = await MyTrip.find({ user: userId }).populate(
      {
        path : "trip"
  });
    // console.log(trips[0]);
    
    // console.log(trips);
    // console.log(tripsWithDetails.length);
    return res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching booked trips:", error);
    return res.status(500).json({ message: "Failed to fetch booked trips" });
  }
}

module.exports = {
  cancelTrip,
  bookTrip,
  allbookedtrips,
};
