# WTWR — Frontend (React + Vite)

What to Wear (WTWR) is a weather-aware clothing recommendation application that helps users decide what to wear based on real-time weather conditions in their selected location.

This repository contains the frontend implementation built with React and Vite. The application integrates with a custom Express + MongoDB backend to support user authentication, profile editing, liking and deleting clothing items, and consistent modal-based workflows, all presented through a clean, responsive user interface.

---

## Live Project

Frontend (Production):  
<https://se-project-react-kappa.vercel.app>

Backend API (Production):  
<https://se-project-express-1-gasc.onrender.com>

Frontend Repository:  
<https://github.com/FHobbs8030/se_project_react>

Backend Repository:  
<https://github.com/FHobbs8030/se_project_express>

---

## Deployment

The WTWR frontend is deployed on Vercel and connected to a Render-hosted Express backend with MongoDB Atlas as the database layer.

### Frontend Deployment

- Hosted on Vercel
- Automatic deployments from GitHub
- Production builds generated with `npm run build`

### Backend Deployment

- Hosted on Render
- Express.js REST API
- Connected to MongoDB Atlas

### Database

- MongoDB Atlas cloud database

---

## Features

- Real-time weather data (OpenWeatherMap)
- Temperature-based clothing recommendations
- Like and unlike clothing items
- Delete items (owner-only, with confirmation modal)
- User authentication (signup, login, logout)
- Edit profile data (name and avatar)
- Accessible modal system
- Clean, responsive UI

---

## Tech Stack

- React 18
- Vite
- React Router DOM
- normalize.css
- CSS using BEM methodology

---

## Project Structure

```text
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

---

## Environment Variables

Create a `.env` file based on `.env.example`.

```text
VITE_API_BASE_URL=https://se-project-express-1-gasc.onrender.com
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_WEATHER_API_KEY=your_openweather_api_key_here
VITE_DEFAULT_COORDS=40.7128,-74.0060
VITE_LOCATION_NAME=New York
```

---

## Getting Started (Local Development)

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5175
```

Note: In production, the frontend communicates directly with the Render-hosted backend API using the `VITE_API_BASE_URL` environment variable.

---

## License

MIT
