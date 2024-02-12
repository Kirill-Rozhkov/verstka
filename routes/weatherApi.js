const express = require("express");
const router = express.Router();
const axios = require("axios");
// const History = require("../model")
const History = require("../model/historySchema");

// // Тригер на /weather. req.query.* приходят с index.ejs
router.get("/weather", async (req, res) => {
  const city = req.query.city;
  console.log(city);

  let weather;
  let error = null;
  const weatherApiKey = "30cf23e4108bbec1a6fc67d3b05b31c6";

  try {
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherApiKey}`;
    const weatherResponse = await axios.get(weatherAPIUrl);
    weather = weatherResponse.data;
  } catch (err) {
    weather = null;
    error = "Error fetching data, please try again";
  }
  const historyEntry = new History({
    user_id: req.session.user.id, // Assuming user information is stored in the session
    request_type: "weather",
    request_data: `${city}`,
    outcome: error ? "Error" : "Success",
  });

  await historyEntry.save();
  console.log(weather);
  res.render("weatherApi", { weather, error });
});
module.exports = router;
