const express = require("express");
const router = express.Router();
const axios = require("axios");
const History = require("../model/historySchema");

router.get("/currency", async (req, res) => {
  const money = req.query.money;
  const amount = req.query.amount;
  console.log(money);
  console.log(amount);
  let data = null;
  let error = null;

  try {
    // Fetch the latest data
    const options = {
      method: "GET",
      url: "https://currencyconverter9.p.rapidapi.com/convert",
      params: {
        to: money,
        amount: amount,
      },
      headers: {
        'X-RapidAPI-Key': '5449637f5bmsh57b2996321a2925p1364fbjsn424ad02c4bfd',
        'X-RapidAPI-Host': 'currencyconverter9.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      data = response.data;

    } catch (error) {
      console.error(error);
      error = "Error fetching data, please try again";
    }

    const historyEntry = new History({
      user_id: req.session.user.id, // Assuming user information is stored in the session
      request_type: "currency",
      request_data: `${data.amount}`,
      outcome: error ? "Error" : "Success",
    });
    await historyEntry.save();
    console.log(data);
  } catch (err) {
    error = "Error fetching data, please try again";
  }

  // Render the view with the fetched data
  res.render("currencyApi", { data, error });
});

module.exports = router;

