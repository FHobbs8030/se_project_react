# 🌦️ WTWR — Frontend (React + Vite)

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-API-46E3B7?style=for-the-badge&logo=render&logoColor=black)

What to Wear (WTWR) is a weather-aware clothing recommendation application that helps users decide what to wear based on real-time weather conditions in their selected location.

This repository contains the frontend implementation built with React and Vite. The application integrates with a custom Express + MongoDB backend to support user authentication, profile editing, liking and deleting clothing items, and consistent modal-based workflows, all presented through a clean, responsive user interface.

---

## 🚀 Live Project

## 🌐 Frontend (Production)

<https://se-project-react-kappa.vercel.app>

## ⚙️ Backend API (Production)

<https://se-project-express-1-gasc.onrender.com>

## 💻 Frontend Repository

<https://github.com/FHobbs8030/se_project_react>

## 🛠️ Backend Repository

<https://github.com/FHobbs8030/se_project_express>

---

## ☁️ Deployment

The WTWR frontend is deployed on Vercel and connected to a Render-hosted Express backend with MongoDB Atlas as the database layer.

## ▲ Frontend Deployment

![Vercel](https://img.shields.io/badge/Vercel-Live-black?style=flat-square&logo=vercel)

- Hosted on Vercel
- Automatic deployments from GitHub
- Production builds generated with `npm run build`

## ⚡ Backend Deployment

![Render](https://img.shields.io/badge/Render-Express_API-46E3B7?style=flat-square&logo=render&logoColor=black)

- Hosted on Render
- Express.js REST API
- Connected to MongoDB Atlas

## 🍃 Database

![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)

- MongoDB Atlas cloud database

---

## ✨ Features

| Feature | Status |
| --- | --- |
| 🌦️ Real-time weather data (OpenWeatherMap) | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |
| 👕 Temperature-based clothing recommendations | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |
| ❤️ Like and unlike clothing items | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |
| 🗑️ Delete items (owner-only with confirmation modal) | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |
| 🔐 User authentication (signup, login, logout) | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |
| 👤 Edit profile data (name and avatar) | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |
| 🪟 Accessible modal system | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |
| 📱 Clean, responsive UI | ![Complete](https://img.shields.io/badge/Complete-success?style=flat-square) |

---

## 🧰 Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-DOM-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-BEM_Methodology-1572B6?style=flat-square&logo=css3&logoColor=white)
![Normalize.css](https://img.shields.io/badge/normalize.css-Used-222222?style=flat-square)

- React 18
- Vite
- React Router DOM
- normalize.css
- CSS using BEM methodology

---

## 📁 Project Structure

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

## 🔑 Environment Variables

Create a `.env` file based on `.env.example`.

```text
VITE_API_BASE_URL=https://se-project-express-1-gasc.onrender.com
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_WEATHER_API_KEY=your_openweather_api_key_here
VITE_DEFAULT_COORDS=40.7128,-74.0060
VITE_LOCATION_NAME=New York
```

---

## 🖥️ Getting Started (Local Development)

## 📦 Install Dependencies

```bash
npm install
```

## ▶️ Run the Development Server

```bash
npm run dev
```

## 🌍 Local URL

```text
http://localhost:5175
```

> ⚠️ Note: In production, the frontend communicates directly with the Render-hosted backend API using the `VITE_API_BASE_URL` environment variable.

---

## 📜 License

![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

MIT
