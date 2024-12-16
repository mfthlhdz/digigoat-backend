const Note = require("../models/Note");

// Mendapatkan semua catatan hanya untuk user yang login
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ tanggal: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil catatan." });
  }
};

// Menambahkan catatan baru
const addNote = async (req, res) => {
  const {
    idKambing,
    tanggal,
    umurKambing,
    berat,
    jenisKelamin,
    pakan,
    jumlahPakan,
    perawatan,
    catatan,
  } = req.body;

  try {
    const newNote = new Note({
      idKambing,
      tanggal,
      umurKambing,
      berat,
      jenisKelamin,
      pakan,
      jumlahPakan,
      perawatan,
      catatan,
      userId: req.user.id, // User ID dari token
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan catatan." });
  }
};

// Menghapus catatan berdasarkan ID dan userId
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan." });
    }

    if (note.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Akses tidak diizinkan." });
    }

    // Gunakan .findByIdAndDelete untuk menghapus catatan
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Catatan berhasil dihapus." });
  } catch (error) {
    console.error("Error during delete:", error);
    res.status(500).json({ message: "Gagal menghapus catatan." });
  }
};


module.exports = { getNotes, addNote, deleteNote };
