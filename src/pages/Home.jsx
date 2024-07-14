import React, { useState, useEffect } from "react";
import { Forecast, Inputs, SunriseAndSunset, TemperatureAndDetails } from "../components";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../components/Api";
import Navbar from "../components/Navbar";
import TweetComponent from "../components/TweetComponent";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [theme, setTheme] = useState("light");
  const [temperatureUnit, setTemperatureUnit] = useState("metric");

  useEffect(() => {
    const savedWeather = localStorage.getItem('currentWeather');
    const savedForecast = localStorage.getItem('forecast');
    const savedTheme = localStorage.getItem('theme');
    const savedTemperatureUnit = localStorage.getItem('temperatureUnit');

    if (savedWeather) setCurrentWeather(JSON.parse(savedWeather));
    if (savedForecast) setForecast(JSON.parse(savedForecast));
    if (savedTheme) setTheme(savedTheme);
    if (savedTemperatureUnit) setTemperatureUnit(savedTemperatureUnit);
  }, []);

  useEffect(() => {
    if (currentWeather) localStorage.setItem('currentWeather', JSON.stringify(currentWeather));
    if (forecast) localStorage.setItem('forecast', JSON.stringify(forecast));
  }, [currentWeather, forecast]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('temperatureUnit', temperatureUnit);
  }, [temperatureUnit]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${temperatureUnit}`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${temperatureUnit}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`min-h-screen py-20 px-4 flex justify-center items-center ${theme === "light" ? "bg-gradient-to-b from-blue-900 to-blue-50 text-white" : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"}`}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        temperatureUnit={temperatureUnit}
        setTemperatureUnit={setTemperatureUnit}
      />
      
      <div className="max-w-4xl w-full space-y-8">
        {/* Search Input and Current Weather Details */}
        <div className={`bg-opacity-10 p-6 rounded-xl shadow-lg ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
          <Inputs onSearchChange={handleOnSearchChange} />
          {currentWeather && (
            <div className="mt-6">
              <TemperatureAndDetails
                data={currentWeather}
                temperatureUnit={temperatureUnit}
                setTemperatureUnit={setTemperatureUnit}
              />
            </div>
          )}
        </div>

        {/* Sunrise and Sunset */}
        {currentWeather && (
          <div className={`bg-opacity-10 p-6 rounded-xl shadow-lg ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
            <SunriseAndSunset data={currentWeather} />
          </div>
        )}

        {/* 7-Day Forecast */}
        {forecast && (
          <div className={`bg-opacity-10 p-6 rounded-xl shadow-lg ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
            <Forecast title="7-Day Forecast" data={forecast} />
          </div>
        )}

        {/* Tweet Component */}
        {currentWeather && (
          <div className={`bg-opacity-10 p-6 rounded-xl shadow-lg ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
            <TweetComponent weatherData={currentWeather} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
