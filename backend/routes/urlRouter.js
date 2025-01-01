const express = require("express");
const {
  generateNewShotURL,
  getAnalytics,
  getAllAnalytics,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/", generateNewShotURL);

router.get("/analytics/:shortId", getAnalytics);

router.get("/allAnalytics", getAllAnalytics);

module.exports = router;
