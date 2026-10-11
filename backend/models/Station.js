const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    chargerType: { type: String, enum: ["CCS", "CHAdeMO", "Type 2", "NACS"], required: true },
    powerKW: { type: Number, required: true },
    pricePerKWh: { type: Number, required: true },
    network: { type: String, trim: true, default: "Independent" },
    availability: { type: String, enum: ["Available", "Busy", "Offline"], default: "Available" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", stationSchema);
