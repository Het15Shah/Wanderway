import React, { useState } from 'react';

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
    <div>
      <h1>Trip Planner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={trip.title} onChange={handleInputChange} required />
        </label>
        <label>
          Destination:
          <input type="text" name="destination" value={trip.destination} onChange={handleInputChange} required />
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={trip.startDate} onChange={handleInputChange} required />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={trip.endDate} onChange={handleInputChange} required />
        </label>
        <label>
          Budget:
          <input type="number" name="budget" value={trip.budget} onChange={handleInputChange} required />
        </label>

        <h2>Itinerary</h2>
        {trip.itinerary.map((day, index) => (
          <div key={index}>
            <h3>Day {day.day}</h3>
            <label>
              Mode of Transportation:
              <select
                value={day.modeOfTransportation}
                onChange={(e) => handleItineraryChange(index, 'modeOfTransportation', e.target.value)}
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

            <label>
              Hotel Name:
              <input
                type="text"
                value={day.hotel.name}
                onChange={(e) => {
                  const updatedHotel = { ...day.hotel, name: e.target.value };
                  handleItineraryChange(index, 'hotel', updatedHotel);
                }}
              />
            </label>
            <label>
              Hotel Location:
              <input
                type="text"
                value={day.hotel.location}
                onChange={(e) => {
                  const updatedHotel = { ...day.hotel, location: e.target.value };
                  handleItineraryChange(index, 'hotel', updatedHotel);
                }}
              />
            </label>

            <h4>Activities</h4>
            {day.activities.map((activity, aIndex) => (
              <div key={aIndex}>
                <label>
                  Time:
                  <input
                    type="time"
                    value={activity.time}
                    onChange={(e) => {
                      const updatedActivities = [...day.activities];
                      updatedActivities[aIndex] = { ...activity, time: e.target.value };
                      handleItineraryChange(index, 'activities', updatedActivities);
                    }}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={activity.description}
                    onChange={(e) => {
                      const updatedActivities = [...day.activities];
                      updatedActivities[aIndex] = { ...activity, description: e.target.value };
                      handleItineraryChange(index, 'activities', updatedActivities);
                    }}
                  />
                </label>
                <label>
                  Location:
                  <input
                    type="text"
                    value={activity.location}
                    onChange={(e) => {
                      const updatedActivities = [...day.activities];
                      updatedActivities[aIndex] = { ...activity, location: e.target.value };
                      handleItineraryChange(index, 'activities', updatedActivities);
                    }}
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={() => addActivity(index)}>
              Add Activity
            </button>
          </div>
        ))}

        <button type="button" onClick={addDay}>
          Add Day
        </button>
        <button type="submit">Save Trip</button>
      </form>
    </div>
  );
}

export default TripForm;
