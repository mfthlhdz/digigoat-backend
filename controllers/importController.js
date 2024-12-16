// backend/controllers/importController.js
const fs = require('fs');
const csv = require('csv-parser');
const { Notes } = require('../models/Note');  // Model Notes yang sudah dibuat

const importData = async (req, res) => {
  const file = req.file;  // Pastikan Anda menggunakan multer untuk menangani file upload

  if (!file) {
    return res.status(400).json({ message: 'File tidak ditemukan' });
  }

  const results = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Simpan data ke MongoDB
        await Notes.insertMany(results);
        res.status(200).json({ message: 'Data berhasil diimpor' });
      } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengimpor data', error });
      }
    });
};

module.exports = { importData };
