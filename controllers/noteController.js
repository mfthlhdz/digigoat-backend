const Note = require("../models/Note");

// Fungsi untuk memproses data dengan AI (disesuaikan)
const processAI = ({ berat, umurKambing }) => {
  // Simulasi logika AI (contoh sederhana)
  if (berat > 50 && umurKambing > 2) {
    return "Sehat";
  }
  return "Tidak Sehat";
};

// Fungsi untuk menambahkan catatan dan memproses AI
const addNote = async (req, res) => {
  const {
    idKambing,
    tanggal,
    umurKambing,
    berat,
    jenisKelamin,
    pakan,
    jumlahPakan,
    catatan,
    perawatan,
  } = req.body;

  try {
    // Proses kesehatan menggunakan AI
    const kesehatan = processAI({ berat, umurKambing });

    // Menyimpan catatan ke database
    const newNote = new Note({
      idKambing,
      tanggal,
      umurKambing,
      berat,
      jenisKelamin,
      pakan,
      jumlahPakan,
      catatan,
      perawatan,
      kesehatan,
    });

    await newNote.save();

    res.status(201).json({ message: "Catatan berhasil ditambahkan", note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// Fungsi untuk mendapatkan semua catatan
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data", error: error.message });
  }
};

module.exports = { addNote, getAllNotes };
