const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  idKambing: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  umurKambing: {
    type: Number,
    required: true,
  },
  berat: {
    type: Number,
    required: true,
  },
  jenisKelamin: {
    type: String,
    enum: ["jantan", "betina"],
    required: true,
  },
  pakan: {
    type: String,
    required: true,
  },
  jumlahPakan: {
    type: Number,
    required: true,
  },
  perawatan: {
    type: String,
    required: true,
  },
  catatan: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
