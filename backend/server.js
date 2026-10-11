require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const stationRoutes = require("./routes/stations");

// Fail fast: tokens cannot be signed or verified without a secret.
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined. Set it in backend/.env (or your host's environment settings).");
  process.exit(1);
}

connectDB();

const app = express();

// CORS: localhost for development, plus any deployed frontend URLs listed in
// CLIENT_URL (comma-separated, no trailing slash).
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean),
];

app.use(express.json({ limit: "100kb" }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Atlas EV API is running" });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stations", authMiddleware, stationRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Something went wrong." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Atlas EV server running on port ${PORT}`);
});
