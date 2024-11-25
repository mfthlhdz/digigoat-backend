// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes'); // Rute untuk autentikasi
const noteRoutes = require('./routes/noteRoutes'); // Rute untuk catatan kambing

dotenv.config(); // Memuat variabel lingkungan dari .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Prefix rute autentikasi
app.use('/api/notes', noteRoutes); // Prefix rute untuk catatan kambing

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Terjadi kesalahan pada server.',
  });
});

// Menjalankan server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
