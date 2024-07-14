import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logoblack,logowhite, } from "../assets/images";
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = ({ theme, toggleTheme, temperatureUnit, setTemperatureUnit }) => {
  const [toggle, setToggle] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 items-center justify-between py-6 px-3 max-[750px]:px-3 max-[300px]:px-6 z-[200] flex transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>


      <Link to="/">
      {
        theme === "light" ? 
        <img
          src={logowhite}
          alt='logo'
          className='w-[200px] h-[120px] ml-0 absolute top-2  cursor-pointer max-[490px]:w-[160px]
           max-[490px]:h-[120px]'
        />
        : <img
        src={logoblack}
        alt='logo'
        className='w-[200px] h-[120px] ml-0 absolute top-2  cursor-pointer max-[490px]:w-[160px]
         max-[490px]:h-[120px]'
      />
      }
      </Link>

      <div className='flex items-center space-x-8 max-[750px]:space-x-4'>
        <button
          onClick={() => setTemperatureUnit("metric")}
          className={`text-xl font-light ${temperatureUnit === "metric" ? "text-blue-500" : "text-white"} max-[490px]:mr-2`}
        >
          &deg;C
        </button>
        <p className='text-white text-xl mx-1 max-[490px]:mx-0'> | </p>
        <button
          onClick={() => setTemperatureUnit("imperial")}
          className={`text-xl font-light ${temperatureUnit === "imperial" ? "text-blue-500" : "text-white"} max-[490px]:ml-2`}
        >
          &deg;F
        </button>

        <div className="flex items-center">
          <button onClick={toggleTheme} className='flex items-center'>
            {theme === "light" ? <FiMoon className="text-xl text-white" /> : <FiSun className="text-xl text-yellow-300" />}
            <span className="ml-2 text-white">{theme === "light" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
