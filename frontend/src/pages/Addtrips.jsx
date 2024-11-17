import React, { useState } from "react";
import "../CSS/Addtrips.css";
import Footer from "../components/Footer";

function TripForm() {
  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    itinerary: [
      {
        day: 1,
        modeOfTransportation: "",
        hotel: {
          name: "",
          location: "",
        },
        activities: [
          {
            time: "",
            description: "",
            location: "",
          },
        ],
      },
    ],
    budget: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleItineraryChange = (index, field, value) => {
    const updatedItinerary = [...trip.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setTrip({ ...trip, itinerary: updatedItinerary });
  };

  const addActivity = (dayIndex) => {
    const updatedItinerary = [...trip.itinerary];
    updatedItinerary[dayIndex].activities.push({
      time: "",
      description: "",
      location: "",
    });
    setTrip({ ...trip, itinerary: updatedItinerary });
  };

  const addDay = () => {
    setTrip({
      ...trip,
      itinerary: [
        ...trip.itinerary,
        {
          day: trip.itinerary.length + 1,
          modeOfTransportation: "",
          hotel: {
            name: "",
            location: "",
          },
          activities: [
            {
              time: "",
              description: "",
              location: "",
            },
          ],
        },
      ],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(trip); // Replace with backend API call if needed
  };

  return (
    <div>
      <h3 className="text-center fw-bold mb-4" style={{ color: "#ffcc00" }}>
        Trip Planner
      </h3>
      <button
        className="Button_submit"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => (window.location.href = "/")}
      >
        Back to Home
      </button>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={trip.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={trip.destination}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="dateSet">
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={trip.startDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Budget:
            <input
              type="number"
              className="budget"
              name="budget"
              value={trip.budget}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <h4
          className="text-center mb-4"
          style={{
            color: "#000000",
            backgroundColor: "#fff5e6",
            padding: "10px",
          }}
        >
          Itinerary
        </h4>

        {trip.itinerary.map((day, index) => (
          <div key={index} className="day-card">
            <div className="day">
              <div className="day-title">
                <h5 className="card-title">Day {day.day}</h5>
              </div>

              <div className="form-group">
                <label>Mode of Transportation:</label>
                <select
                  className="form-control"
                  value={day.modeOfTransportation}
                  onChange={(e) =>
                    handleItineraryChange(
                      index,
                      "modeOfTransportation",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select</option>
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="plane">Plane</option>
                  <option value="boat">Boat</option>
                  <option value="walking">Walking</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hotel Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={day.hotel.name}
                  onChange={(e) => {
                    const updatedHotel = { ...day.hotel, name: e.target.value };
                    handleItineraryChange(index, "hotel", updatedHotel);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Hotel Location:</label>
                <input
                  type="text"
                  className="form-control"
                  value={day.hotel.location}
                  onChange={(e) => {
                    const updatedHotel = {
                      ...day.hotel,
                      location: e.target.value,
                    };
                    handleItineraryChange(index, "hotel", updatedHotel);
                  }}
                />
              </div>
            </div>

            <div className="act">
              <div className="activity">
                <h5 className="mt-4">Activities</h5>
              </div>
              {day.activities.map((activity, aIndex) => (
                <div key={aIndex} className="activity-card">
                  <div className="form-group">
                    <label>Time:</label>
                    <input
                      type="time"
                      className="form-control"
                      value={activity.time}
                      onChange={(e) => {
                        const updatedActivities = [...day.activities];
                        updatedActivities[aIndex] = {
                          ...activity,
                          time: e.target.value,
                        };
                        handleItineraryChange(
                          index,
                          "activities",
                          updatedActivities
                        );
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={activity.description}
                      onChange={(e) => {
                        const updatedActivities = [...day.activities];
                        updatedActivities[aIndex] = {
                          ...activity,
                          description: e.target.value,
                        };
                        handleItineraryChange(
                          index,
                          "activities",
                          updatedActivities
                        );
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={activity.location}
                      onChange={(e) => {
                        const updatedActivities = [...day.activities];
                        updatedActivities[aIndex] = {
                          ...activity,
                          location: e.target.value,
                        };
                        handleItineraryChange(
                          index,
                          "activities",
                          updatedActivities
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addActivity(index)}
              >
                Add Activity
              </button>
            </div>
          </div>
        ))}

        <div className="add">
          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={addDay}
          >
            Add Day
          </button>
        </div>

        <div className="save">
          <button type="submit" className="btn btn-success">
            Save Trip
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default TripForm;
