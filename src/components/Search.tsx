import React, { useState, useEffect } from "react";
import { useWeather } from "../context/WeatherContext"; // adjust the path if needed

const SearchBar: React.FC = () => {
  const { setSearchTerm } = useWeather();
  const [term, setTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, 100);

    return () => clearTimeout(handler);
  }, [term]);

  useEffect(() => {
    if (debouncedTerm.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      try {
        console.log("Fetching cities in India...");
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/box/city?bbox=68.7,6.5,97.25,35.5,10&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.list) {
          const cityNames: string[] = data.list.map(
            (city: { id: number; name: string }) => city.name
          );
          const filteredCities = cityNames.filter((city: string) =>
            city.toLowerCase().startsWith(debouncedTerm.toLowerCase())
          );
          setSuggestions(filteredCities);
        } else {
          console.error("No cities found in response.");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [debouncedTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSelect = (city: string) => {
    setTerm(city);
    setSuggestions([]);
    setSearchTerm(city);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-full mx-auto my-8 p-6 bg-white shadow-lg rounded-xl"
    >
      <div className="relative">
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
            {suggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelect(city)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="mt-4 w-[10%] px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
