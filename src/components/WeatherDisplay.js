import React from "react";
import PropTypes from "prop-types";

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return <div>No weather data available. Please search for a city.</div>;
  }

  const { temperature, description, city, forecast } = weatherData;

  return (
    <div className="weather-display">
      <h2>Weather in {city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      {forecast && forecast.length > 0 && (
        <div className="forecast-container">
          <h3>5-Day Forecast</h3>
          <ul>
            {forecast.map((day) => (
              <li key={day.date}>
                <strong>{day.date}:</strong> {day.description}, {day.minTemp}°C
                - {day.maxTemp}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

WeatherDisplay.propTypes = {
  weatherData: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    forecast: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        minTemp: PropTypes.number.isRequired,
        maxTemp: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default WeatherDisplay;
