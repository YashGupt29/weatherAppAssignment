import type React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CityDetails from "./components/CityDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:id" element={<CityDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
