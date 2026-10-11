const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");
const { CONNECTOR_TYPES } = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Every route in this file requires a valid JWT.
router.use(authMiddleware);

const fail = (res, status, message) => res.status(status).json({ success: false, message });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  vehicles: user.vehicles.map((v) => ({
    id: v._id,
    make: v.make,
    connectorType: v.connectorType,
    batteryKWh: v.batteryKWh,
    rangeKm: v.rangeKm,
  })),
});

/** GET /api/user/profile */
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return fail(res, 404, "User not found.");
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: { user: publicUser(user) },
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    return fail(res, 500, "Something went wrong while fetching your profile.");
  }
});

/** PATCH /api/user/password  { currentPassword, newPassword } */
router.patch("/password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return fail(res, 400, "Current password and new password are required.");
    }
    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return fail(res, 400, "New password must be at least 6 characters long.");
    }
    if (currentPassword === newPassword) {
      return fail(res, 400, "New password must be different from the current one.");
    }

    const user = await User.findById(req.user.id);
    if (!user) return fail(res, 404, "User not found.");

    const matches = await bcrypt.compare(currentPassword, user.password);
    if (!matches) return fail(res, 400, "Current password is incorrect.");

    user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Change password error:", error.message);
    return fail(res, 500, "Something went wrong while updating your password.");
  }
});

/** POST /api/user/vehicles  { make, connectorType, batteryKWh, rangeKm } */
router.post("/vehicles", async (req, res) => {
  try {
    const { make, connectorType, batteryKWh, rangeKm } = req.body;
    if (!make || !String(make).trim()) return fail(res, 400, "Vehicle make and model is required.");
    if (connectorType && !CONNECTOR_TYPES.includes(connectorType)) {
      return fail(res, 400, `Connector type must be one of: ${CONNECTOR_TYPES.join(", ")}.`);
    }

    const toNumber = (v) => (v === "" || v === undefined || v === null ? undefined : Number(v));
    const battery = toNumber(batteryKWh);
    const range = toNumber(rangeKm);
    if ((battery !== undefined && !(battery > 0)) || (range !== undefined && !(range > 0))) {
      return fail(res, 400, "Battery and range must be positive numbers.");
    }

    const user = await User.findById(req.user.id);
    if (!user) return fail(res, 404, "User not found.");
    if (user.vehicles.length >= 10) return fail(res, 400, "You can save up to 10 vehicles.");

    user.vehicles.push({
      make: String(make).trim(),
      connectorType: connectorType || "CCS",
      batteryKWh: battery,
      rangeKm: range,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Vehicle added.",
      data: { vehicles: publicUser(user).vehicles },
    });
  } catch (error) {
    if (error.name === "ValidationError") return fail(res, 400, error.message);
    console.error("Add vehicle error:", error.message);
    return fail(res, 500, "Something went wrong while adding your vehicle.");
  }
});

/** DELETE /api/user/vehicles/:vehicleId */
router.delete("/vehicles/:vehicleId", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return fail(res, 404, "User not found.");

    const vehicle = user.vehicles.id(req.params.vehicleId);
    if (!vehicle) return fail(res, 404, "Vehicle not found.");

    vehicle.deleteOne();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Vehicle removed.",
      data: { vehicles: publicUser(user).vehicles },
    });
  } catch (error) {
    if (error.name === "CastError") return fail(res, 400, "Invalid vehicle id.");
    console.error("Delete vehicle error:", error.message);
    return fail(res, 500, "Something went wrong while removing your vehicle.");
  }
});

module.exports = router;
