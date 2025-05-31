/**
 * Fetches the current weather and 5-day forecast for a given city using the Open-Meteo APIs.
 *
 * @param {string} city - The name of the city to fetch weather data for. Must be a non-empty string.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   - {string} city: The resolved city name (with country if available)
 *   - {number} temperature: The current temperature in Celsius
 *   - {string} description: A human-readable weather description
 *   - {Array} forecast: Array of objects [{ date, minTemp, maxTemp, description }]
 *
 * @throws {Error} If the city is invalid, not found, or if there is a network/API error.
 *
 * @example
 * import fetchWeatherByCity from './api/weatherApi';
 *
 * fetchWeatherByCity('London')
 *   .then(data => {
 *     // data = {
 *     //   city: "London, United Kingdom",
 *     //   temperature: 18.2,
 *     //   description: "Partly cloudy",
 *     //   forecast: [
 *     //     { date: "2024-06-01", minTemp: 12.1, maxTemp: 19.8, description: "Partly cloudy" },
 *     //     ...
 *     //   ]
 *     // }
 *     console.log(data);
 *   })
 *   .catch(error => {
 *     console.error(error.message);
 *   });
 */

import { weatherCodeMap } from "../utils/weatherCodeMapping";

const fetchWeatherByCity = async (city) => {
  if (!city || typeof city !== "string" || !city.trim()) {
    throw new Error("Please provide a valid city name.");
  }

  // Step 1: Build the URL to get latitude and longitude for the city
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;

  try {
    // Step 2: Fetch the geocoding data
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) {
      throw new Error("Could not fetch location data. Please try again later.");
    }
    const geoData = await geoResponse.json();

    // Step 3: Check if the city was found
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(
        "City not found. Please check the spelling and try again."
      );
    }

    // Step 4: Get latitude and longitude from the first result
    const {
      latitude,
      longitude,
      name: resolvedCity,
      country,
    } = geoData.results[0];

    // Step 5: Build the URL to get current weather and 5-day forecast for the coordinates
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto`;

    // Step 6: Fetch the weather data
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error("Could not fetch weather data. Please try again later.");
    }
    const weatherData = await weatherResponse.json();

    // Step 7: Check if current weather data is available
    if (!weatherData.current_weather) {
      throw new Error("Weather data not available for this location.");
    }

    // Step 8: Map weather code to human-readable description for current weather
    const code = weatherData.current_weather.weathercode;
    const description = weatherCodeMap[code] || `Weather code: ${code}`;

    // Step 9: Build the 5-day forecast array (use 'index' instead of 'idx')
    let forecast = [];
    if (
      weatherData.daily &&
      weatherData.daily.time &&
      weatherData.daily.temperature_2m_min &&
      weatherData.daily.temperature_2m_max &&
      weatherData.daily.weathercode
    ) {
      forecast = weatherData.daily.time.map((date, index) => ({
        date,
        minTemp: weatherData.daily.temperature_2m_min[index],
        maxTemp: weatherData.daily.temperature_2m_max[index],
        description:
          weatherCodeMap[weatherData.daily.weathercode[index]] ||
          `Weather code: ${weatherData.daily.weathercode[index]}`,
      }));
    }

    // Step 10: Return the result as a JSON object
    return {
      city: resolvedCity
        ? resolvedCity + (country ? `, ${country}` : "")
        : city,
      temperature: weatherData.current_weather.temperature, // in Celsius
      description: description,
      forecast,
    };
  } catch (error) {
    // Step 11: Log the error and rethrow so the calling code can handle it
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default fetchWeatherByCity;
