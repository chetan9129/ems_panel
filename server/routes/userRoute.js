const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const { name, email, username, password } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid Email Address" });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ message: "Email Address already existed" });
    }
    if (!validateLength(name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "Name should be between 3 to 30 characters" });
    }
    if (!validateLength(password, 3, 30)) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }
    let tempUsername = name;
    let newUsername = await validateUsername(tempUsername);
    const newuser = new User({
      name,
      email,
      username: newUsername,
      password: hashed,
    });
    console.log(req.body);
    await newuser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    } else {
      res.send(user);
    }
  } catch (error) {
    return res.status(400).json({ message: "Login error occured" });
  }
});
module.exports = router;
