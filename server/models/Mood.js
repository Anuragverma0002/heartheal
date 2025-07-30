const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  note: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Mood", moodSchema);
