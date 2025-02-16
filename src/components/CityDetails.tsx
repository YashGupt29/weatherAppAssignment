import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface WeatherDetails {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const CityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(
    null
  );

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherDetails(data);
    };

    fetchWeatherDetails();
  }, [id]);

  if (!weatherDetails) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <Link
            to="/"
            className="text-blue-500 hover:underline inline-block mb-4"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {weatherDetails.name}
          </h1>
          <div className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm mb-6">
            <img
              src={`http://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`}
              alt={weatherDetails.weather[0].description}
              className="w-20 h-20 mr-6"
            />
            <div>
              <p className="text-3xl font-semibold text-gray-800">
                {weatherDetails.main.temp}°C
              </p>
              <p className="text-lg text-gray-500 capitalize">
                {weatherDetails.weather[0].description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow">
              <p className="font-semibold text-gray-700">Feels Like</p>
              <p className="text-xl text-gray-800">
                {weatherDetails.main.feels_like}°C
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow">
              <p className="font-semibold text-gray-700">Humidity</p>
              <p className="text-xl text-gray-800">
                {weatherDetails.main.humidity}%
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg shadow">
              <p className="font-semibold text-gray-700">Wind Speed</p>
              <p className="text-xl text-gray-800">
                {weatherDetails.wind.speed} m/s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
