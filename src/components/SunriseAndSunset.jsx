import React from "react";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { TbSunHigh, TbSunLow } from "react-icons/tb";

const SunriseAndSunset = ({ data }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = hours % 12 + ':' + minutes.substr(-2) + ' ' + ampm;
    return formattedTime;
  };

  return (
    <div className="text-[#000a18e0]" >
      <div className="flex flex-row justify-around items-center">
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <FiSunrise size={30} className="text-yellow-500" />
          </div>
          <p className="font-light text-sm text-gray-300">Sunrise</p>
          <p className="font-semibold text-md text-gray-300">{formatTime(data.sys.sunrise)}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <FiSunset size={30} className="text-orange-500" />
          </div>
          <p className="text-gray-300 font-light text-sm">Sunset</p>
          <p className="text-gray-300 font-semibold text-md">{formatTime(data.sys.sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default SunriseAndSunset;
