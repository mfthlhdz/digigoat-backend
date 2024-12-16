// backend/controllers/exportController.js
const { Notes } = require('../models/Note');  // Model Notes yang sudah dibuat
const json2csv = require('json2csv').parse; // Untuk mengkonversi JSON ke CSV

const exportData = async (req, res) => {
  try {
    const { format, userId } = req.body; // Ambil format dan userId dari body
    const notes = await Notes.find({ userId }); // Ambil data catatan berdasarkan userId

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    let exportData;

    if (format === 'CSV') {
      exportData = json2csv(notes); // Konversi data ke format CSV
    } else if (format === 'JSON') {
      exportData = JSON.stringify(notes); // Konversi data ke format JSON
    } else {
      return res.status(400).json({ message: 'Format tidak didukung' });
    }

    res.header('Content-Type', `application/${format.toLowerCase()}`); // Tentukan tipe konten sesuai format
    res.attachment(`data_${userId}.${format.toLowerCase()}`); // Set nama file unduhan
    res.send(exportData); // Kirim data yang akan diunduh
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengekspor data', error });
  }
};

module.exports = { exportData };
