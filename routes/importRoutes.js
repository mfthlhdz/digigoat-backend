// backend/routes/importRoutes.js
const express = require('express');
const multer = require('multer');
const { importData } = require('../controllers/importController');
const router = express.Router();

// Konfigurasi multer untuk upload file
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), importData);

module.exports = router;
