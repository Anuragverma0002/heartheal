// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Console log for startup
console.log("🚀 Starting HeartHeal backend...");

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const ventRoutes = require('./routes/ventRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/vents', ventRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/thoughts', thoughtRoutes);

// ✅ Serve static client files (React/HTML frontend)
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

// ✅ Fallback for frontend routes (not API)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// ✅ MongoDB connection + server start
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/heartheal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log(`🌐 Server is running at: http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1); // Stop server on DB failure
});
