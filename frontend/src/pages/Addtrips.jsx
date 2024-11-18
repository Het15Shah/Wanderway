import React, { useState } from 'react';
import FOOTER from '../components/Footer';
import '../CSS/Addtrips.css'; // Updated styles are in this file

function TripForm() {
  const [trip, setTrip] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    itinerary: [
      {
        day: 1,
        modeOfTransportation: '',
        hotel: {
          name: '',
          location: '',
        },
        activities: [
          {
            time: '',
            description: '',
            location: '',
          },
        ],
      },
    ],
    budget: '',
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
      time: '',
      description: '',
      location: '',
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
          modeOfTransportation: '',
          hotel: {
            name: '',
            location: '',
          },
          activities: [
            {
              time: '',
              description: '',
              location: '',
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
    <div className="trip-form-container">
      <h1 className="trip-form-title">Trip Planner</h1>
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
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="trip-form-group">
          <label className="trip-form-label">
            Title:
            <input
              type="text"
              name="title"
              value={trip.title}
              onChange={handleInputChange}
              className="trip-form-input"
              required
            />
          </label>
        </div>
        <div className="trip-form-group">
          <label className="trip-form-label">
            Destination:
            <input
              type="text"
              name="destination"
              value={trip.destination}
              onChange={handleInputChange}
              className="trip-form-input"
              required
            />
          </label>
        </div>
        <div className="trip-date-budget-group">
          <label className="trip-form-label">
            Start Date:
            <input
              type="date"
              name="startDate"
              value={trip.startDate}
              onChange={handleInputChange}
              className="trip-form-input"
              required
            />
          </label>
          <label className="trip-form-label">
            End Date:
            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              onChange={handleInputChange}
              className="trip-form-input"
              required
            />
          </label>
          <label className="trip-form-label">
            Budget:
            <input
              type="number"
              name="budget"
              value={trip.budget}
              onChange={handleInputChange}
              className="trip-form-input"
              required
            />
          </label>
        </div>

        <div className="trip-itinerary-container">
          <div className='title-ininerary'><h2 className="trip-itinerary-title">Itinerary</h2></div>
          {trip.itinerary.map((day, index) => (
            <div key={index} className="trip-itinerary-day">
              <h3 className="trip-itinerary-day-title">Day {day.day}</h3>
              <div className="trip-itinerary-group">
                <label className="trip-form-label">
                  Mode of Transportation:
                  <select
                    value={day.modeOfTransportation}
                    onChange={(e) => handleItineraryChange(index, 'modeOfTransportation', e.target.value)}
                    className="trip-form-select"
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
                </label>
              </div>
              <div className="trip-itinerary-group">
                <label className="trip-form-label">
                  Hotel Name:
                  <input
                    type="text"
                    value={day.hotel.name}
                    onChange={(e) => {
                      const updatedHotel = { ...day.hotel, name: e.target.value };
                      handleItineraryChange(index, 'hotel', updatedHotel);
                    }}
                    className="trip-form-input"
                  />
                </label>
                <label className="trip-form-label">
                  Hotel Location:
                  <input
                    type="text"
                    value={day.hotel.location}
                    onChange={(e) => {
                      const updatedHotel = { ...day.hotel, location: e.target.value };
                      handleItineraryChange(index, 'hotel', updatedHotel);
                    }}
                    className="trip-form-input"
                  />
                </label>
              </div>

              <h4 className="trip-activities-title">Activities</h4>
              {day.activities.map((activity, aIndex) => (
                <div key={aIndex} className="trip-activity-group">
                  <label className="trip-form-label">
                    Time:
                    <input
                      type="time"
                      value={activity.time}
                      onChange={(e) => {
                        const updatedActivities = [...day.activities];
                        updatedActivities[aIndex] = { ...activity, time: e.target.value };
                        handleItineraryChange(index, 'activities', updatedActivities);
                      }}
                      className="trip-form-input"
                    />
                  </label>
                  <label className="trip-form-label">
                    Description:
                    <input
                      type="text"
                      value={activity.description}
                      onChange={(e) => {
                        const updatedActivities = [...day.activities];
                        updatedActivities[aIndex] = { ...activity, description: e.target.value };
                        handleItineraryChange(index, 'activities', updatedActivities);
                      }}
                      className="trip-form-input"
                    />
                  </label>
                  <label className="trip-form-label">
                    Location:
                    <input
                      type="text"
                      value={activity.location}
                      onChange={(e) => {
                        const updatedActivities = [...day.activities];
                        updatedActivities[aIndex] = { ...activity, location: e.target.value };
                        handleItineraryChange(index, 'activities', updatedActivities);
                      }}
                      className="trip-form-input"
                    />
                  </label>
                </div>
              ))}
              <button
                type="button"
                className="trip-form-button add-activity-button"
                onClick={() => addActivity(index)}
              >
                Add Activity
              </button>
            </div>
          ))}
        </div>


        
          <button type="button" className="trip-form-button add-day-button" onClick={addDay}>
            Add Day
          </button>
          <button type="submit" className="trip-form-button submit-button">
            Save Trip
          </button>
        

          <FOOTER />
      </form>
    </div>
  
  );
}

export default TripForm;
