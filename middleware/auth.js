const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("--- BACKEND AUTH CHECK ---");
  console.log("RECEIVED HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn("REJECTED: No Bearer token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "secretkey";
    const decoded = jwt.verify(token, secret);

    console.log("SUCCESS: Token verified for user:", decoded.userId);
    req.user = decoded;
    next();

  } catch (err) {
    console.error("REJECTED: Verification failed -", err.message);
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = auth;