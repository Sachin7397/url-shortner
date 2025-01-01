const express = require("express");
const connectDB = require("./database");
const urlRoute = require("./routes/urlRouter");
const URL = require("./models/url");
const cors = require("cors");

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(cors());
app.use("/url", urlRoute);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
