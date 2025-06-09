import fetchWeatherByCity from '../weatherApi';

global.fetch = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('fetchWeatherByCity', () => {
  test('returns weather data on success', async () => {
    const geoResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        results: [{
          latitude: 1,
          longitude: 2,
          name: 'London',
          country: 'UK'
        }]
      })
    };
    const weatherResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        current_weather: {
          temperature: 20,
          weathercode: 0
        },
        daily: {
          time: ['2024-01-01'],
          temperature_2m_min: [10],
          temperature_2m_max: [20],
          weathercode: [0]
        }
      })
    };
    fetch
      .mockResolvedValueOnce(geoResponse)
      .mockResolvedValueOnce(weatherResponse);

    const data = await fetchWeatherByCity('London');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(data.city).toBe('London, UK');
    expect(data.temperature).toBe(20);
    expect(data.forecast.length).toBe(1);
  });

  test('throws error when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchWeatherByCity('Paris')).rejects.toThrow('Network error');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
