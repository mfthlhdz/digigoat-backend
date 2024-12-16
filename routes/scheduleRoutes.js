const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const scheduleController = require("../controllers/scheduleController");

// Mendapatkan semua jadwal milik pengguna
router.get("/", authenticateToken, scheduleController.getSchedules);

// Menambahkan jadwal baru
router.post("/", authenticateToken, scheduleController.createSchedule);

// Memperbarui jadwal berdasarkan ID
router.put("/:id", authenticateToken, scheduleController.updateSchedule);

// Menghapus jadwal berdasarkan ID
router.delete("/:id", authenticateToken, scheduleController.deleteSchedule);

module.exports = router;
