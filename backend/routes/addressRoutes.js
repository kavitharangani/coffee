const express = require("express");
const Address = require("../models/Address");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// Create a new address (only authenticated users can add addresses)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { street, city, state, zipCode, country } = req.body;

    // Ensure the user is authenticated and their user ID is attached to the request
    const userId = req.user;  // This will be the user's ID from the JWT token

    const address = new Address({
      user: userId,  // Link the address to the authenticated user
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
    // Only allow the user to access their own addresses
    if (req.user !== req.params.userId) {
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
