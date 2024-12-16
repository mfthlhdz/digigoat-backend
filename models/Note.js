// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  idKambing: String,
  tanggal: Date,
  umurKambing: Number,
  berat: Number,
  jenisKelamin: String,
  pakan: String,
  jumlahPakan: Number,
  perawatan: String,
  catatan: String,
  kondisiKesehatan: String, // Sehat/Tidak Sehat
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Note', noteSchema);
