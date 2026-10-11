const mongoose = require("mongoose");

const CONNECTOR_TYPES = ["CCS", "CHAdeMO", "Type 2", "NACS"];

/** A vehicle saved on a user's profile. */
const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: [true, "Vehicle make and model is required"], trim: true, maxlength: 80 },
  connectorType: { type: String, enum: CONNECTOR_TYPES, default: "CCS" },
  batteryKWh: { type: Number, min: 1, max: 300 },
  rangeKm: { type: Number, min: 1, max: 2000 },
});

/**
 * User schema. The stored password is always a bcrypt hash; hashing is done
 * in the route handlers so the model stays a plain description of the data.
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    vehicles: { type: [vehicleSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
module.exports.CONNECTOR_TYPES = CONNECTOR_TYPES;
