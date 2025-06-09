import React, { useState } from "react";
import PropTypes from "prop-types";

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
        // Error handling is delegated to the parent component
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
        aria-label="City"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  fetchWeatherByCity: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchBar;
