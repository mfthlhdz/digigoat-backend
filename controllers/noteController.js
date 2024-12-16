const Note = require("../models/Note");

// Mendapatkan semua catatan hanya untuk user yang login
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ tanggal: -1 });

    // Menghitung persentase sehat dan sakit
    const totalKambing = notes.length;
    const sehat = notes.filter(note => note.kondisiKesehatan === 'Sehat').length;
    const sakit = totalKambing - sehat;
    
    const sehatPercentage = totalKambing > 0 ? (sehat / totalKambing) * 100 : 0;
    const sakitPercentage = totalKambing > 0 ? (sakit / totalKambing) * 100 : 0;

    res.status(200).json({
      notes,
      sehatPercentage,
      sakitPercentage,
    });
  } catch (error) {
    console.error("Error during fetching notes:", error);
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

  // Menentukan kondisi kesehatan
  let kondisiKesehatan = 'Tidak Sehat';
  if (berat >= 20 && berat <= 40 && umurKambing >= 1 && umurKambing <= 3 && jumlahPakan >= 1 && jumlahPakan <= 3) {
    kondisiKesehatan = 'Sehat';
  }

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
      kondisiKesehatan, // Menyimpan kondisi kesehatan
      userId: req.user.id, // User ID dari token
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error during adding note:", error);
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

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Catatan berhasil dihapus." });
  } catch (error) {
    console.error("Error during delete:", error);
    res.status(500).json({ message: "Gagal menghapus catatan." });
  }
};

module.exports = { getNotes, addNote, deleteNote };
