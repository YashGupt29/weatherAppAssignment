import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WeatherProvider } from "./context/WeatherContext.tsx";
// import ProblemChild from "./problem.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <WeatherProvider>
        <App />
        {/* <ProblemChild /> */}
      </WeatherProvider>
    </ErrorBoundary>
  </StrictMode>
);
