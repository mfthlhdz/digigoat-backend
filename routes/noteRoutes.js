const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const noteController = require("../controllers/noteController");

// Endpoint untuk mendapatkan catatan pengguna
router.get("/", authenticateToken, noteController.getNotes);

// Endpoint untuk menambahkan catatan baru
router.post("/", authenticateToken, noteController.addNote);

// Endpoint untuk menghapus catatan berdasarkan ID
router.delete("/:id", authenticateToken, noteController.deleteNote);

module.exports = router;
