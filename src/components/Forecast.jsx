import React from "react";

// Custom SVG icons as URLs
const weatherIcons = {
  clear: "https://cdn-icons-png.flaticon.com/128/6974/6974831.png",
  clouds: "https://cdn-icons-png.flaticon.com/128/899/899683.png",
  rain: "https://cdn-icons-png.flaticon.com/128/2864/2864403.png",
  snow: "https://cdn-icons-png.flaticon.com/128/2315/2315377.png",
  // Add other custom icons as needed
};

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data, title }) => {
  const daysInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(daysInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, daysInWeek)
  );

  const getWeatherIcon = (weather) => {
    const lowerCaseWeather = weather.toLowerCase();
    return weatherIcons[lowerCaseWeather] || weatherIcons.clear;
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 mt-5 mb-10 w-full">
      <p className="text-white font-bold text-xl mb-6">{title}</p>
      <div className="flex flex-row overflow-x-auto w-full space-x-6 px-4 no-scrollbar">
        {data.list.slice(0, 7).map((item, idx) => (
          <div
            key={idx}
            className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-10 flex flex-col items-center justify-center shadow-lg min-w-[190px] max-w-[180px] space-y-4 hover:scale-102 transform transition-transform duration-200"
          >
            <p className="text-[#667689] font-light text-sm">{forecastDays[idx]}</p>
            <p className="text-white text-2xl">{Math.round(item.main.temp)}&deg;</p>
            <div className="w-16 h-16">
              <img
                src={getWeatherIcon(item.weather[0].main)}
                alt="weather-icon"
                className="w-full h-full"
              />
            </div>
            <p className="text-[#667689] font-light text-sm capitalize">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
