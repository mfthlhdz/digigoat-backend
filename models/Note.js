const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  idKambing: { type: String, required: true },
  tanggal: { type: String, required: true },
  umurKambing: { type: String, required: true },
  berat: { type: String, required: true },
  jenisKelamin: { type: String, required: true },
  pakan: { type: String, required: true },
  jumlahPakan: { type: String, required: true },
  catatan: { type: String, required: true },
  perawatan: { type: String, required: true },
  kesehatan: { type: String },  // Data tambahan untuk hasil AI
});

module.exports = mongoose.model('Note', noteSchema);
