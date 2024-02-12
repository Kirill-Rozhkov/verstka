const express = require("express");
const router = express.Router();

const User = require("../model/userModel");
// Render the list of users

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users. Please try again.");
  }
});

// Render the user creation form
router.get("/add", (req, res) => {
  res.render("addUser");
});

// Handle user creation
router.post("/add", async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    const newUser = new User({
      username,
      password, // Remember to hash the password in a real-world scenario
      isAdmin: !!isAdmin, // Convert to boolean
    });

    await newUser.save();
    console.log("User added successfully:", newUser);
    res.redirect("/admin"); // Redirect to the admin page after user creation
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user. Please try again.");
  }
});

// Render the user editing form
router.get("/edit/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    res.render("editUser", { user });
  } catch (error) {
    console.error("Error fetching user for editing:", error);
    res.status(500).send("Error fetching user for editing. Please try again.");
  }
});

router.get("/edit/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).send("User not found");
    }

    res.render("editUser", { user });
  } catch (error) {
    console.error("Error fetching user for editing:", error);
    res.status(500).send("Error fetching user for editing. Please try again.");
  }
});
// Handle user editing
router.post("/edit/:userId", async (req, res) => {
  console.log(req.body);
  const userId = req.params.userId;
  const { username, password, isAdmin } = req.body;

  try {
    await User.findByIdAndUpdate(userId, {
      username,
      password, // Remember to hash the password in a real-world scenario
      isAdmin: !!isAdmin, // Convert to boolean
    });

    console.log("User updated successfully");
    res.redirect("/admin"); // Redirect to the admin page after user editing
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user. Please try again.");
  }
});

// Handle user deletion
router.get("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    await User.findByIdAndDelete(userId);
    console.log("User deleted successfully");
    res.redirect("/admin"); // Redirect to the admin page after user deletion
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user. Please try again.");
  }
});

module.exports = router;
