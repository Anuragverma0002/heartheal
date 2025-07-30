// server/models/Thought.js
const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Thought", thoughtSchema);
