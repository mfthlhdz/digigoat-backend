const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan, silakan login." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Token tidak valid atau kedaluwarsa." });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User tidak ditemukan atau telah dihapus." });
    }

    req.user = { id: user._id, email: user.email };
    next();
  } catch (err) {
    console.error("Error autentikasi token:", err.message);
    return res.status(500).json({ message: "Terjadi kesalahan saat melakukan autentikasi." });
  }
};


module.exports = authenticateToken;
