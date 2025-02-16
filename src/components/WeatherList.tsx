import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWeather } from "../context/WeatherContext";

const WeatherList: React.FC = () => {
  const { weatherData, searchTerm, loading } = useWeather();
  const [page, setPage] = useState<number>(1);
  const citiesPerPage = 5;

  const filteredData =
    weatherData?.filter((city) =>
      city?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    ) || [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Loading cities...</p>
      </div>
    );
  }

  if (!loading && filteredData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <p className="mt-4 text-lg text-gray-600">No cities found</p>
      </div>
    );
  }

  const paginatedData = filteredData.slice(
    (page - 1) * citiesPerPage,
    page * citiesPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedData.map((city) => (
            <Link
              to={`/city/${city.id}`}
              key={city.id}
              className="block transition-transform duration-300 transform hover:scale-105"
            >
              <div className="bg-white/80 backdrop-filter backdrop-blur-lg shadow-xl rounded-xl p-6 border border-gray-200 hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {city.name}
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-gray-600">🌡 {city.main.temp}°C</p>
                  <img
                    src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                    alt={city.weather[0].description}
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-gray-500 mt-4 capitalize text-sm">
                  {city.weather[0].description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ⬅ Previous
          </button>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page * citiesPerPage >= filteredData.length}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherList;
