const Vent = require("../models/Vent");

exports.submitVent = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const vent = new Vent({ userId, message });
    await vent.save();

    res.status(201).json({ message: "Vent saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit vent", details: err.message });
  }
};

exports.getAllVents = async (req, res) => {
  try {
    const vents = await Vent.find().sort({ createdAt: -1 });
    res.status(200).json(vents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vents", details: err.message });
  }
};
