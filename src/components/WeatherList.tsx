import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface WeatherData {
  id: number;
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface WeatherListProps {
  searchTerm: string;
}

const WeatherList: React.FC<WeatherListProps> = ({ searchTerm }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [page, setPage] = useState<number>(1);
  const citiesPerPage = 5;

  useEffect(() => {
    const cities = [
      "London",
      "New York",
      "Tokyo",
      "Paris",
      "Berlin",
      "Moscow",
      "Dubai",
      "Sydney",
      "Rome",
      "Madrid",
    ];
    const fetchWeatherData = async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      if (!searchTerm) {
        const promises = cities.map((city) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          ).then((res) => res.json())
        );
        const results = await Promise.all(promises);
        setWeatherData(results);
      } else {
        const city = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${apiKey}`
        ).then((res) => res.json());
        setWeatherData([city]);
      }
    };

    fetchWeatherData();
  }, [searchTerm]);

  const filteredData = weatherData.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
