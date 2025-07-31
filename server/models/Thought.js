// server/models/Thought.js
const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // ✅ Automatically adds createdAt and updatedAt

module.exports = mongoose.model("Thought", thoughtSchema);
