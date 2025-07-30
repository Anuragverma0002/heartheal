// server/routes/moodRoutes.js
const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// Get all moods
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: 1 });
    res.json(moods);
  } catch (err) {
    console.error('Fetch moods error:', err);
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
});

// Post a new mood
router.post('/', async (req, res) => {
  const { mood, note } = req.body;
  try {
    const newMood = new Mood({ mood, note });
    await newMood.save();
    res.status(201).json({ message: 'Mood logged!' });
  } catch (err) {
     console.error("Mood submission error:", err.message, err.stack);
    res.status(400).json({ error: 'Failed to save mood' });
  }
});

module.exports = router;
