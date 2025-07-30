const express = require("express");
const router = express.Router();
const { submitVent, getAllVents } = require("../controllers/ventController");

router.post("/", submitVent);
router.get("/", getAllVents);

module.exports = router;
