const Schedule = require("../models/Schedule");

// Mendapatkan semua jadwal milik pengguna
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.user.id });
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error mendapatkan jadwal:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil jadwal." });
  }
};

// Menambahkan jadwal baru
exports.createSchedule = async (req, res) => {
  const { goatCode, note, date } = req.body;
  try {
    const newSchedule = new Schedule({
      userId: req.user.id,
      goatCode,
      note,
      date,
    });
    await newSchedule.save();
    res.status(201).json({ message: "Jadwal berhasil ditambahkan.", data: newSchedule });
  } catch (error) {
    console.error("Error menambahkan jadwal:", error.message);
    res.status(400).json({ message: "Gagal menambahkan jadwal.", error });
  }
};

// Memperbarui jadwal berdasarkan ID
exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { goatCode, note, date } = req.body;
  try {
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { goatCode, note, date },
      { new: true }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Jadwal tidak ditemukan atau tidak memiliki akses." });
    }
    res.status(200).json({ message: "Jadwal berhasil diperbarui.", data: updatedSchedule });
  } catch (error) {
    console.error("Error memperbarui jadwal:", error.message);
    res.status(400).json({ message: "Gagal memperbarui jadwal.", error });
  }
};

// Menghapus jadwal berdasarkan ID
exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSchedule = await Schedule.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Jadwal tidak ditemukan atau tidak memiliki akses." });
    }
    res.status(200).json({ message: "Jadwal berhasil dihapus.", data: deletedSchedule });
  } catch (error) {
    console.error("Error menghapus jadwal:", error.message);
    res.status(500).json({ message: "Gagal menghapus jadwal.", error });
  }
};
