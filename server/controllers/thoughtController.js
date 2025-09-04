const Thought = require("../models/Thought");

exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    console.error("Error fetching thoughts:", err);
    res.status(500).json({ error: "Failed to fetch thoughts" });
  }
};

exports.addThought = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const newThought = new Thought({
      user: req.user._id,
      content,
    });
    await newThought.save();
    res.status(201).json(newThought);
  } catch (err) {
    console.error("Error saving thought:", err);
    res.status(500).json({ error: "Failed to save thought" });
  }
};
