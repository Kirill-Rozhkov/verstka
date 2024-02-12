const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
// Обработка GET запроса для страницы регистрации
router.get("/register", (req, res) => {
  res.render("register"); // Рендерим шаблон register.ejs
});

// Обработка POST запроса для обработки данных регистрации
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Handle the case where the username is already taken
      return res.status(400).send("Username already taken");
    }

    const newUser = new User({
      username,
      password: password,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    // Save the user to MongoDB
    await newUser.save();

    console.log("User registered successfully:", newUser);
    res.redirect("/"); // Redirect to login page after registration
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user. Please try again.");
  }
});

module.exports = router;
