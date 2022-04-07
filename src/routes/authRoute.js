const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");

//Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (
    typeof username === "undefined" ||
    typeof email === "undefined" ||
    typeof password === "undefined"
  ) {
    res.status(400).send("Invalid parameters");
  }

  try {
    const newUserCreated = await AuthService.registerUser({
      username,
      email,
      password,
    });
    console.log("user created successfully ");
    res.status(201).json({
      message: "user created successfully ",
      createdUser: newUserCreated,
    });
  } catch (error) {
    console.log(`Error in creation ${error}`);
    res.status(501).send("User not created, due to error");
  }
});

module.exports = router;