import React, { useState } from "react";

const SearchBar = ({ fetchWeatherByCity, loading }) => {
  const [city, setCity] = useState("");

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedCity = city.trim();

    if (trimmedCity) {
      try {
        await fetchWeatherByCity(trimmedCity);
      } catch (e) {
        console.log("error search");
      }
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>{" "}
    </form>
  );
};

export default SearchBar;
