import React from "react";

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

export default WeatherDisplay;
