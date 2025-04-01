const express = require("express");
const Address = require("../models/Address");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// Create a new address (only authenticated users can add addresses)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { street, city, state, zipCode, country } = req.body;
    const userId = req.user.id; // Extract user ID from the authenticated request

    const address = new Address({
      user: userId,
      street,
      city,
      state,
      zipCode,
      country,
    });

    await address.save();
    res.status(201).json({ message: "Address added successfully", address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding address", error: error.message });
  }
});

// Get all addresses for a user (only the logged-in user can view their addresses)
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "Access denied. You can only view your own addresses." });
    }

    const addresses = await Address.find({ user: req.params.userId });
    res.status(200).json({ addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching addresses", error: error.message });
  }
});

// Admin route to get all addresses (admin only)
router.get("/admin/addresses", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({ addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching addresses", error: error.message });
  }
});

module.exports = router;
