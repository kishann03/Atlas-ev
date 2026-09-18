require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Connect to MongoDB before starting the server.
connectDB();

const app = express();

// --- Core middleware ---
app.use(express.json()); // parses incoming JSON request bodies

// CORS: allow the local React dev server to call this API.
// Vite's default dev port is 5173; CRA's default is 3000 — both are
// allowed here so this works regardless of which one your frontend uses.
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// --- Routes ---
app.get("/", (req, res) => {
  res.status(200).json({ message: "Atlas EV API is running" });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// --- Start server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Atlas EV server running on http://localhost:${PORT}`);
});
