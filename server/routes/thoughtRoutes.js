// server/routes/thoughtRoutes.js
const express = require("express");
const router = express.Router();
const { getAllThoughts, addThought } = require("../controllers/thoughtController");

router.get("/", getAllThoughts);
router.post("/", addThought);

module.exports = router;
