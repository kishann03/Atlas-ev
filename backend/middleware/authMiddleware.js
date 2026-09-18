const jwt = require("jsonwebtoken");

/**
 * Protects routes by requiring a valid JWT in the Authorization header:
 *   Authorization: Bearer <token>
 *
 * On success, attaches the decoded token payload to req.user (currently
 * just { id, iat, exp }) and calls next(). On failure, responds with
 * 401 and stops the request from reaching the protected route.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided. Authorization header must be 'Bearer <token>'.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: <userId>, iat, exp }
    next();
  } catch (error) {
    // Covers both an invalid signature and an expired token —
    // jsonwebtoken throws different error names for each, but the
    // client-facing response can stay the same.
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

module.exports = authMiddleware;
