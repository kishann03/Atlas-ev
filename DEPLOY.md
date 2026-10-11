# Deploying Atlas EV

Order matters: database → backend → frontend → connect them.

## 1. MongoDB Atlas
1. Network Access → add `0.0.0.0/0` (Render's IPs change).
2. Copy your connection string (Database → Connect → Drivers). Keep it private.

## 2. Backend on Render
1. New → Web Service → connect the GitHub repo.
2. Root Directory `backend`, Build `npm install`, Start `npm start`.
3. Environment variables (set in the dashboard only):
   - `MONGO_URI` – your Atlas connection string
   - `JWT_SECRET` – a long random string (e.g. `openssl rand -hex 32`)
   - `CLIENT_URL` – your Vercel URL (add after step 3), no trailing slash
4. Deploy, then open `https://<your-api>.onrender.com/api/health` – it should say ok.
   (Free Render services sleep when idle; the first request can take ~30 s.)

## 3. Seed the stations (once)
On your computer, in `backend/`, with a `.env` containing the same `MONGO_URI`:
```
npm run seed
```

## 4. Frontend on Vercel
1. New Project → import the repo → Root Directory `frontend` (Vite is auto-detected).
2. Environment variables:
   - `VITE_API_BASE_URL` = `https://<your-api>.onrender.com/api`
   - `VITE_GOOGLE_MAPS_API_KEY` = your Maps key (optional)
3. Deploy. Copy the Vercel URL into Render's `CLIENT_URL` and redeploy the backend.

## 5. Google Maps key (optional)
Google Cloud Console → enable **Maps JavaScript API** → create an API key → restrict it
to HTTP referrers: `https://<your-app>.vercel.app/*` and `http://localhost:5173/*`.
Without a key the stations page shows a simple built-in map.

## Local development
```
cd backend  && cp .env.example .env && npm install && npm run dev
cd frontend && cp .env.example .env && npm install && npm run dev
```
