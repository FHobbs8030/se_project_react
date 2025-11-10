# 👗 WTWR — Frontend (React + Vite)

What to Wear (WTWR) is a weather‑aware clothing suggestions app. The frontend fetches live weather and displays recommended items from your API.

## ✨ Features

- Real‑time weather by city/coords
- Temperature‑based clothing recommendations
- Interactive item cards + modals
- Clean, responsive UI

## 🧰 Tech Stack

- **React 18** + **Vite**
- **React Router DOM**
- **normalize.css**
- Deployment via **gh-pages**

---

## 📦 Project Structure

```text
se_project_react/
├─ public/                      # Static assets
├─ src/
│  ├─ components/               # Reusable UI
│  ├─ pages/                    # Route-level views
│  ├─ contexts/                 # React contexts
│  ├─ blocks/                   # CSS (BEM)
│  ├─ utils/
│  │  ├─ weatherApi.js          # OpenWeather calls
│  │  ├─ itemsApi.js            # Backend items API
│  │  └─ authApi.js             # Auth endpoints
│  ├─ App.jsx
│  └─ main.jsx
├─ .env.example                 # Example env vars
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## 🔐 Environment Variables

An `.env.example` is included. Copy it to `.env` and adjust values:

```bash
cp .env.example .env
```

**.env.example contents:**

```ini
VITE_API_BASE_URL=<http://localhost:3001>
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_WEATHER_API_KEY=your_openweather_api_key_here
VITE_DEFAULT_COORDS=40.7128,-74.0060
VITE_LOCATION_NAME=New York
```

> By default the app points to `<http://localhost:3001>` for the backend and OpenWeather for weather data.

---

## 🚀 Getting Started

```bash
# 1) Install
npm install

# 2) (Optional) Run JSON Server mock
npm run server           # serves db.json on :3001
# or
npm run mock             # serves db.json on :3004 with /public as static

# 3) Start the Vite dev server
npm run dev              # opens at <http://localhost:5175>
```

### Using your Express backend (recommended)

- Start your backend on **<http://localhost:3001>**.
- Ensure CORS allows `<http://localhost:5175>` and credentials/settings match front‑end use.
- If your API runs elsewhere, set `VITE_API_BASE_URL` accordingly.

---

## 📜 NPM Scripts

| Script             | What it does                                                     |
|--------------------|------------------------------------------------------------------|
| `npm run dev`      | Start Vite dev server with HMR (port 5175)                       |
| `npm run build`    | Build production assets                                          |
| `npm run preview`  | Preview the production build locally                             |
| `npm run lint`     | Lint with ESLint                                                 |
| `npm run lint:fix` | Lint and auto‑fix                                                |
| `npm run server`   | JSON Server mock API on port 3001 (uses `db.json`)               |
| `npm run mock`     | JSON Server mock on port 3004, serves `/public` as static        |
| `npm run dev:all`  | Run Vite and JSON Server mock together (concurrently)            |
| `npm run deploy`   | Deploy `dist/` to GitHub Pages (after `predeploy` build)         |

---

## 🌐 APIs Used

- **OpenWeatherMap** — current weather data (`VITE_WEATHER_API_URL`, `VITE_WEATHER_API_KEY`)
- **WTWR Backend API** — clothing items & auth (`VITE_API_BASE_URL`)

---

## 🔎 Troubleshooting

- **CORS errors**: If sending cookies, do not use `*` as `Access-Control-Allow-Origin`. Set an explicit origin and include `Access-Control-Allow-Credentials: true` if needed.
- **401/403 from API**: Confirm `VITE_API_BASE_URL`, tokens/cookies flow, and backend auth middleware.
- **Weather not loading**: Verify `VITE_WEATHER_API_KEY` and that the request URL matches your account plan (metric vs imperial).
- **Port conflicts**: Change the Vite port in the `dev` script in `package.json` or stop other processes using it.

---

## 📸 Screenshots

<!-- Place your UI screenshots in /public or a docs/ folder and link them here -->
<!-- Example: ![WTWR Dashboard](./public/images/dashboard.png) -->

## 🔗 Live Demo

<!-- Replace with your deployed URL if available -->
<!-- Example: https://FHobbs8030.github.io/se_project_react -->

## 📄 License

MIT
