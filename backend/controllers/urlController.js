const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShotURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    shortId: result.shortId,
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function getAllAnalytics(req, res) {
  const results = await URL.find();
  const analyticsData = results.map((url) => ({
    shortId: url.shortId,
    totalClicks: url.visitHistory.length,
    analytics: url.visitHistory,
  }));

  return res.json(analyticsData);
}

module.exports = { generateNewShotURL, getAnalytics, getAllAnalytics };
