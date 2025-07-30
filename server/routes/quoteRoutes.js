const express = require("express");
const router = express.Router();
const { getMotivationalQuote } = require("../controllers/quoteController");

router.get("/", getMotivationalQuote);

module.exports = router;
