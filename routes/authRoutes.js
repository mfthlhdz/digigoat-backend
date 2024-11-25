// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  // Cek apakah email sudah digunakan
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email sudah terdaftar' });
  }

  const user = new User({
    fullName,
    email,
    password
  });

  try {
    await user.save();
    res.status(201).json({ message: 'Pendaftaran berhasil' });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Email atau password salah' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Email atau password salah' });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({
    message: 'Login berhasil',
    token
  });
});

module.exports = router;
