const mongoose = require("mongoose");

const ventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false // Allow anonymous vents
  },
  message: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Vent", ventSchema);
