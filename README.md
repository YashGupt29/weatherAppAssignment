# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

Below is an example of a **README.md** file that explains your project, its structure, and how to set it up.

---

# Weather App

A simple weather application built with React and TypeScript that fetches current weather data from the [OpenWeatherMap API](https://openweathermap.org/api). The app allows users to search for a city's weather and view detailed weather information on a separate page. It also displays weather for a list of preset cities with pagination.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Acknowledgements](#acknowledgements)

## Features

- **Home Page:**

  - Displays a search bar for querying a specific city’s weather.
  - Lists weather information for a set of default cities (London, New York, Tokyo, etc.) when no search term is entered.
  - Implements pagination to browse through the list of cities.
  - Used Debouncing for search cities to limit api request
  - implemented Context API for managing states
  - implemented Error Boundary for handling errors during API requests
  - can also implement lazy loading and fetch data using react-query(if Asked!!)
  - also use redux(if told!!)

- **City Details Page:**

  - Provides detailed weather information for a selected city including:
    - Current temperature
    - Feels like temperature
    - Humidity
    - Wind speed
    - Weather description and icon

- **Routing:**
  - Uses React Router to navigate between the home page (`/`) and a city’s details page (`/city/:id`).

## Tech Stack

- **React** with **TypeScript** for building the user interface.
- **React Router** for client-side routing.
- **Tailwind CSS** for styling (as indicated by the class names used in the components).
- **Fetch API** for making HTTP requests to the OpenWeatherMap API.
- **Vite** for a fast development build (inferred from the usage of `import.meta.env`).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YashGupt29/weatherAppAssignment.git
   cd weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or if you are using Yarn:

   ```bash
   yarn install
   ```

## Configuration

This project uses the OpenWeatherMap API. To set it up:

1. Create a `.env` file in the root directory of your project.

2. Add your OpenWeatherMap API key to the file:

   ```env
   VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual API key.

## Usage

### Development

Start the development server:

```bash
npm run dev
```

or with Yarn:

```bash
yarn dev
```

### Build

To build the project for production:

```bash
npm run build
```

or with Yarn:

```bash
yarn build
```

Then, you can preview the production build:

```bash
npm run preview
```

or:

```bash
yarn preview
```

## Project Structure

```
weather-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CityDetails.tsx      // Displays detailed weather info for a selected city.
│   │   ├── Home.tsx             // Home page with search and weather list.
│   │   ├── Search.tsx           // (Intended to be) SearchBar component for handling city search.
│   │   └── WeatherList.tsx      // Fetches and displays weather data for multiple cities with pagination.
│   ├── App.tsx                  // Sets up routing between Home and CityDetails.
│   └── main.tsx                 // Entry point that renders the App component.
├── .env                         // Environment variables (API key, etc.)
├── package.json
└── README.md
```

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API.
- [React Router](https://reactrouter.com/) for client-side routing.
- [Tailwind CSS](https://tailwindcss.com/) for styling inspiration.

---
