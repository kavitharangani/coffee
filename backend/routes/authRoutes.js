const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
    try {
      const { userName, email, password, confirmPassword, role } = req.body;
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ userName, email, password: hashedPassword, role });
  
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// User Login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid password" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, userId: user._id, role: user.role });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
