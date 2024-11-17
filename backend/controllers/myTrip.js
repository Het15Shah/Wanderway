const MyTrip = require("../models/myTrip");

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
    console.log(newTrip);

    return res.status(200).json({ message: "Trip Booked Successfully!!" });
  } catch (error) {
    console.error("Error booking trip:", error);
    return res
      .status(500)
      .json({ message: "Failed to book trip", error: error.message });
  }
}

module.exports = {
  cancelTrip,
  bookTrip,
};
