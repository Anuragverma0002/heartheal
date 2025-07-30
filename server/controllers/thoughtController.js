// server/controllers/thoughtController.js
const Thought = require("../models/Thought");

// GET all thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ timestamp: -1 });
    res.json(thoughts);
  } catch (err) {
    console.error("Error fetching thoughts:", err);
    res.status(500).json({ error: "Failed to fetch thoughts" });
  }
};

// POST new thought
exports.addThought = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const newThought = new Thought({ content });
    await newThought.save();
    res.status(201).json({ message: "Thought saved!", thought: newThought });
  } catch (err) {
    console.error("Error saving thought:", err);
    res.status(500).json({ error: "Failed to save thought" });
  }
};
