const Vent = require("../models/Vent");

exports.submitVent = async (req, res) => {
  try {
    const { message } = req.body;
    const newVent = new Vent({
      user: req.user._id,
      message,
    });
    await newVent.save();
    res.status(201).json(newVent);
  } catch (err) {
    console.error("Vent error:", err);
    res.status(500).json({ error: "Failed to submit vent" });
  }
};

exports.getAllVents = async (req, res) => {
  try {
    const vents = await Vent.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(vents);
  } catch (err) {
    console.error("Error fetching vents:", err);
    res.status(500).json({ error: "Failed to fetch vents" });
  }
};
