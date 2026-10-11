const express = require("express");
const router = express.Router();
const Station = require("../models/Station");

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** GET /api/stations?search=&chargerType= */
router.get("/", async (req, res) => {
  try {
    const { search, chargerType } = req.query;
    const filter = {};
    if (chargerType && chargerType !== "All") filter.chargerType = String(chargerType);
    if (search && String(search).trim()) {
      const rx = new RegExp(escapeRegex(String(search).trim().slice(0, 60)), "i");
      filter.$or = [{ name: rx }, { address: rx }, { network: rx }];
    }
    const stations = await Station.find(filter).sort({ name: 1 }).lean();
    res.json({
      success: true,
      message: "Stations fetched successfully.",
      data: { count: stations.length, stations },
    });
  } catch (err) {
    console.error("List stations error:", err.message);
    res.status(500).json({ success: false, message: "Could not load charging stations." });
  }
});

/** GET /api/stations/:id */
router.get("/:id", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).lean();
    if (!station) return res.status(404).json({ success: false, message: "Station not found." });
    res.json({ success: true, message: "Station fetched successfully.", data: { station } });
  } catch (err) {
    if (err.name === "CastError") return res.status(400).json({ success: false, message: "Invalid station id." });
    console.error("Get station error:", err.message);
    res.status(500).json({ success: false, message: "Could not load the station." });
  }
});

module.exports = router;
