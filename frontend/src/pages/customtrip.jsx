import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTrip = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   // Fetch destinations
  //   axios
  //     .get("/api/destinations")
  //     .then((res) => setDestinations(res.data))
  //     .catch((err) => console.error("Error fetching destinations:", err));
  // }, []);

  const handleGenerateTrip = async () => {
    setError("");
    setLoading(true);

    if (!selectedDestination || !budget || !days) {
      setError("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/customTrip", {
        destination: selectedDestination,
        budget,
        days,
      });
      setTripPlan(response.data);
    } catch (err) {
      setError("Failed to generate trip. Please try again.");
      console.error("Error generating trip:", err);
    } finally {
      setLoading(false);
    }
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
        <strong>Budget (in USD)</strong>
      </label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Enter your budget"
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Days Input */}
      <label>
        <strong>Number of Days</strong>
      </label>
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        placeholder="Enter the number of days"
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

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
      {tripPlan && (
        <div style={{ marginTop: "30px" }}>
          <h3>Generated Trip Itinerary for {tripPlan.destination}</h3>
          <p>
            <strong>Title:</strong> {tripPlan.title}
          </p>
          <p>
            <strong>Budget:</strong> ${tripPlan.budget}
          </p>
          <p>
            <strong>Highlights:</strong> {tripPlan.highlights.join(", ")}
          </p>
          <h4>Itinerary</h4>
          {tripPlan.itinerary.map((day, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h5>Day {day.day}</h5>
              <p>
                <strong>Mode of Transportation:</strong>{" "}
                {day.modeOfTransportation}
              </p>
              <p>
                <strong>Hotel:</strong> {day.hotel.name} ({day.hotel.location})
              </p>
              <p>
                <strong>Activities:</strong>
              </p>
              <ul>
                {day.activities.map((activity, idx) => (
                  <li key={idx}>
                    <strong>{activity.time}</strong> - {activity.description} (
                    {activity.location})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateTrip;
