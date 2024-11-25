const express = require('express');
const router = express.Router();
const { addNote, getAllNotes } = require('../controllers/noteController');

// Route untuk menambah catatan
router.post('/', addNote);

// Route untuk mendapatkan semua catatan
router.get('/', getAllNotes);

module.exports = router;
