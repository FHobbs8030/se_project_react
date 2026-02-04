# WTWR — Frontend (React + Vite)

What to Wear (WTWR) is a weather-aware clothing recommendation application that helps users decide what to wear based on real-time weather conditions in their selected location.

This repository contains the frontend implementation built with React and Vite. The application integrates with a custom Express + MongoDB backend to support user authentication, profile editing, liking and deleting clothing items, and consistent modal-based workflows, all presented through a clean, responsive user interface.

---

## Live Project

Frontend (deployed on Google Cloud Compute Engine):  
[http://34.42.205.0](http://34.42.205.0)

Frontend Repository:  
[https://github.com/FHobbs8030/se_project_react](https://github.com/FHobbs8030/se_project_react)

Backend Repository:  
[https://github.com/FHobbs8030/se_project_express](https://github.com/FHobbs8030/se_project_express)

---

## Deployment

The frontend is deployed on a Google Cloud Compute Engine virtual machine and served via nginx.

- Production build generated with `npm run build`
- Static files served from `/var/www/wtwr`
- nginx configured for SPA routing using `try_files` to support client-side navigation

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
VITE_API_BASE_URL=http://localhost:3001
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_WEATHER_API_KEY=your_openweather_api_key_here
VITE_DEFAULT_COORDS=40.7128,-74.0060
VITE_LOCATION_NAME=New York
```

---

## Getting Started

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

---

## License

MIT
