const express = require("express");
const router = express.Router();

/**
 * GET /api/health
 * Simple uptime/status check. Useful for confirming the server is
 * running, and later for connecting monitoring tools or the frontend's
 * own "is the API alive" check.
 */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Atlas EV backend is healthy",
  });
});

module.exports = router;
