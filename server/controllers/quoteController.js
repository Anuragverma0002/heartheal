const quotes = [
  "It’s okay to not be okay. You’re doing your best.",
  "Healing takes time. Breathe.",
  "Progress is progress, no matter how small.",
  "The sun will rise and so will you.",
  "Your heart is stronger than you think."
];

exports.getMotivationalQuote = (req, res) => {
  const index = Math.floor(Math.random() * quotes.length);
  res.status(200).json({ quote: quotes[index] });
};
