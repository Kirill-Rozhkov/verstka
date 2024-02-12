const express = require("express");
const router = express.Router();

const User = require("../model/userModel");
// Обработка GET запроса для страницы входа
router.get("/", (req, res) => {
  res.render("login");
});

// Обработка POST запроса для обработки данных входа
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if a user with the given username exists
    const user = await User.findOne({ username });

    if (!user) {
      // If the user does not exist, handle accordingly (e.g., redirect to login page)
      console.log("User not found");
      return res.status(401).send("Invalid username or password");
    }

    // Compare the entered password with the stored password
    if (password === user.password) {
      // Passwords match, login successful
      req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin };

      
      if (user.isAdmin) {
        // If the user is an admin, redirect to the adminRouter
        console.log("Admin login successful");
        res.redirect("/admin");
      } else {
        // If the user is not an admin, redirect to the mainRouter
        console.log("User login successful");
        res.redirect("/user");
      }
    } else {
      // Passwords do not match, handle accordingly (e.g., redirect to login page)
      console.log("Invalid password");
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login. Please try again.");
  }
});

module.exports = router;
