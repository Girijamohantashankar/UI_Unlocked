const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// api for Signup page

exports.signup = async (req, res) => {
  const { username, email, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(400).json({ error: "passwords do not match" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    user = new User({ username, email, password });
    await user.save();

    // token generate
    const token = jwt.sign({ userId: user._id }, "jwt_secret", {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "user registered", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
