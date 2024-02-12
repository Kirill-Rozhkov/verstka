const express = require("express");
const router = express.Router();

// Обработка запросов для корневого маршрута '/'
router.get("/", async (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.render("main", { user });
});

router.post("/logout", (req, res) => {
  console.log("Received logout request");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Error during logout");
    } else {
      // Redirect to the login page or any other page after logout
      res.redirect("/login");
    }
  });
});
module.exports = router;
