const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Ambil token dari header Authorization
  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token tidak valid" });
    }
    req.user = decoded; // Menyimpan data pengguna dalam req.user
    next();
  });
};

module.exports = verifyToken;
