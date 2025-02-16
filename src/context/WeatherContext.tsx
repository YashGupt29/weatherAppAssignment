import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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

interface WeatherContextType {
  weatherData: WeatherData[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
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
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      try {
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchTerm]);

  return (
    <WeatherContext.Provider
      value={{ weatherData, searchTerm, loading, error, setSearchTerm }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
