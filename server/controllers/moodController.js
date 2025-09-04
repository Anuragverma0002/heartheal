const Mood = require("../models/Mood");

exports.addMood = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const newMood = new Mood({
      user: req.user._id,
      mood,
      note,
    });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    console.error("Mood submission error:", err);
    res.status(500).json({ error: "Failed to save mood" });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(moods);
  } catch (err) {
    console.error("Fetch moods error:", err);
    res.status(500).json({ error: "Failed to fetch moods" });
  }
};
