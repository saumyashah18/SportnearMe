const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    console.log("JWT_SECRET at verifyToken:", process.env.JWT_SECRET);
    console.log("JWT received for verification:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid token." });
  }
};

const generateToken = (payload) => {
  console.log("JWT_SECRET at generateToken:", process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  verifyToken: auth,
  generateToken,
};
