require("dotenv").config();
const mongoose = require("mongoose");
const Station = require("../models/Station");
const stations = require("../data/sampleStations");

(async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined. Add it to backend/.env first.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Station.deleteMany({});
    const created = await Station.insertMany(stations);
    console.log(`Seeded ${created.length} stations.`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
