const express = require("express");
const jwt = require("jsonwebtoken");  // To verify the JWT token
const Payment = require("../models/Payment");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// Create Payment API
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { paymentMethod, transactionId, cardDetails } = req.body;
    const userId = req.user.id; // Get the user ID from JWT payload

    // Validate payment method
    if (!["COD", "Card"].includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: "Invalid payment method" });
    }

    // Ensure card details are required only for Card payments
    if (paymentMethod === "COD" && cardDetails) {
      return res.status(400).json({ success: false, message: "Card details should not be entered for COD payments." });
    }
    if (paymentMethod === "Card" && (!cardDetails || !cardDetails.cardNumber)) {
      return res.status(400).json({ success: false, message: "Card details are required for card payments." });
    }

    // Create a payment record
    const newPayment = new Payment({
      user: userId, // Save the logged-in user's ID
      paymentMethod,
      transactionId: transactionId || null, // Optional transactionId
      status: "Completed",
      cardDetails: paymentMethod === "Card" ? cardDetails : null, // Only save card details if payment is by card
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment: newPayment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all payments for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id }); // Use req.user.id
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get a single payment by ID (only if it belongs to the logged-in user)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findOne({ _id: req.params.id, user: req.user.id }); // Use req.user.id

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update payment status (only if the payment belongs to the logged-in user)
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Completed", "Failed"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid payment status" });
    }

    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Use req.user.id
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete payment by ID (only if the payment belongs to the logged-in user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // Use req.user.id

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
