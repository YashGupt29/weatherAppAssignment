import type React from "react";
import WeatherList from "./WeatherList";
import SearchBar from "./Search";

const Home: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Weather App</h1>
      <SearchBar />
      <WeatherList />
    </main>
  );
};

export default Home;
