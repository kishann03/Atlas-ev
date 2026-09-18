const mongoose = require("mongoose");

/**
 * User schema.
 *
 * Note: the password stored here is always a bcrypt HASH, never plain
 * text. Hashing happens in the signup route (routes/auth.js), not here —
 * keeping the model itself simple and focused on shape/validation is
 * easier to reason about and explain.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
