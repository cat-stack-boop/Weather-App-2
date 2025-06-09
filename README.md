# Weather App (Global - CAT1 - AI Training for Software Engineering Graduates - 2025)

### Giving vibe coding a go :P

## Description

This is a simple weather application built with React. The app allows users to enter a city name and fetches the current weather data from the Open-Meteo API. The weather information is displayed in a user-friendly format.

## Project Structure

```
weather-app
├── public
│   └── index.html            # Main HTML file
├── src
│   ├── api
│   │   └── weatherApi.js         # API calls for fetching weather data
│   ├── components
│   │   ├── WeatherDisplay.js     # Component to display weather data and forecast
│   │   └── SearchBar.js          # Component for user input
│   ├── styles
│   │   └── App.css               # CSS styles for the application
│   ├── utils
│   │   └── weatherCodeMapping.js # Weather code to description mapping
│   ├── App.js                    # Main application component
│   ├── index.js                  # Entry point for the React app
├── package.json                  # npm configuration file
└── README.md                     # Project documentation
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone <repository-url>
   cd weather-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the application:

   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Linting

To check the code style using ESLint, run:

```
npm run lint
```

This will lint the source files in the `src` directory according to the project's ESLint configuration.

## Running Tests Locally

To run tests for this project, use the following command in your project directory:

```
npm test
```

This will launch the test runner in interactive watch mode. Make sure you have created test files (e.g., files ending with `.test.js` or `.spec.js`) in your `src` directory.

For more information about testing in React, see the [Create React App testing documentation](https://create-react-app.dev/docs/running-tests/).

## Features

- User can input a city name to fetch weather data.
- Displays current weather conditions in a clear format.
- Shows a 5-day weather forecast for the selected city.
- Responsive design for better user experience.

## Technologies Used

- React
- Open-Meteo API
- CSS for styling

## License

This project is licensed under the MIT License.
