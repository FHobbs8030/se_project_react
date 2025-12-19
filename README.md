# WTWR — Frontend (React + Vite)

What to Wear (WTWR) is a weather-aware clothing recommendation application.
The frontend fetches live weather data and displays clothing items from a custom backend API,
including authentication, likes, profile editing, and modal workflows.

## Features

- Real-time weather data (OpenWeatherMap)
- Temperature-based clothing recommendations
- Like and unlike clothing items
- Delete items (owner-only, with confirmation modal)
- User authentication (signup, login, logout)
- Edit profile data (name and avatar)
- Accessible modal system
- Clean, responsive UI

## Tech Stack

- React 18
- Vite
- React Router DOM
- normalize.css
- CSS using BEM methodology

## Project Structure

```
se_project_react/
├─ public/
├─ src/
│  ├─ components/
│  ├─ blocks/
│  ├─ utils/
│  │  ├─ weatherApi.js
│  │  ├─ itemsApi.js
│  │  └─ authApi.js
│  ├─ App.jsx
│  └─ main.jsx
├─ .env.example
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## Environment Variables

Create a `.env` file based on `.env.example`.

Example `.env.example`:

```
VITE_API_BASE_URL=http://localhost:3001
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_WEATHER_API_KEY=your_openweather_api_key_here
VITE_DEFAULT_COORDS=40.7128,-74.0060
VITE_LOCATION_NAME=New York
```

## Getting Started

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

The application will be available at:

```
http://localhost:5175
```

## Using the Backend API

- Ensure the backend server is running at `http://localhost:3001`
- Configure CORS to allow requests from `http://localhost:5175`
- Update `VITE_API_BASE_URL` if your backend runs on a different URL

## Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build production assets
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## APIs Used

- OpenWeatherMap API
- WTWR Backend API

## License

MIT
