const Mood = require("../models/Mood");

exports.submitMood = async (req, res) => {
  try {
    const { userId, moodLevel, note } = req.body;

    const mood = new Mood({ userId, moodLevel, note });
    await mood.save();

    res.status(201).json({ message: "Mood recorded" });
  } catch (err) {
        console.error("Mood submission error:", err.message, err.stack);
    res.status(500).json({ error: "Could not save mood", details: err.message });
  }
};

exports.getMoodStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const moods = await Mood.find({ userId }).sort({ createdAt: 1 });

    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch mood data", details: err.message });
  }
};
