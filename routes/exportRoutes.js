// backend/routes/exportRoutes.js
const express = require('express');
const { exportData } = require('../controllers/exportController');
const router = express.Router();

router.get('/', exportData);

module.exports = router;
