// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log("🚀 Starting HeartHeal backend...");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const ventRoutes = require('./routes/ventRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/vents', ventRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/thoughts', thoughtRoutes);

// MongoDB connection + Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🌐 Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
