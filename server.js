const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes'); // Rute untuk autentikasi
const noteRoutes = require('./routes/noteRoutes'); // Rute untuk catatan kambing
const scheduleRoutes = require('./routes/scheduleRoutes');
const importRoutes = require('./routes/importRoutes');
const exportRoutes = require('./routes/exportRoutes');

dotenv.config(); // Memuat variabel lingkungan dari .env

const app = express();

// Pengaturan CORS untuk membaca origin dari .env
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Default ke semua origin jika tidak didefinisikan
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization', // Mengizinkan header tertentu
};

app.use(cors(corsOptions)); // Menggunakan CORS dengan pengaturan spesifik
app.use(express.json());

// Koneksi ke MongoDB
mongoose
  .connect(process.env.DB_URI) // Tambahkan opsi jika diperlukan
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Prefix rute autentikasi
app.use('/api/notes', noteRoutes); // Prefix rute untuk catatan kambing
app.use('/api/schedules', scheduleRoutes);
app.use('/api/import', importRoutes);
app.use('/api/export', exportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Terjadi kesalahan pada server.',
  });
});

// Menjalankan server
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
