import React, { useState } from "react";
import { GoLocation, GoSearch } from "react-icons/go";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "./Api";

function Inputs({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => ({
        options: response.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      }))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-row items-center w-full justify-center px-2">
      <div className="flex flex-row space-x-4 items-center">
        <AsyncPaginate
          debounceTimeout={600}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          value={search}
          placeholder="Search for city..."
          className="w-[250px] z-40 text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          styles={{
            control: () => ({
              display: "flex",
              border: "none",
              boxShadow: "none",
            }),
            menu: () => ({
              backgroundColor: "rgba(31, 41, 55, 1)",
              borderRadius: "0.5rem",
            }),
            option: (provided, { isFocused }) => ({
              ...provided,
              backgroundColor: isFocused ? "#3b82f6" : "#1f2937",
              color: isFocused ? "white" : "#ffffff",
            }),
          }}
        />
        <GoSearch size={20} color="white" className="cursor-pointer" />
      </div>
    </div>
  );
}

export default Inputs;
