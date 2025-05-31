import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import fetchWeatherByCity from "./api/weatherApi";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
      }}
    >
      <SearchBar fetchWeatherByCity={handleSearch} loading={loading} />
      <div style={{ marginTop: "60px", width: "100%", maxWidth: "700px" }}>
        {loading && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            Loading...
          </div>
        )}
        {error && (
          <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        )}
        {weather && <WeatherDisplay weatherData={weather} />}
      </div>
    </div>
  );
};

export default App;
