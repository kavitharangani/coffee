const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Address = require("../models/Address");
const Item = require("../models/Item");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// ✅ Create a new order (Authenticated users only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, paymentId, addressId } = req.body;
    const userId = req.user.id; // ✅ Extract user ID properly

    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ message: "Invalid Payment ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid Address ID format" });
    }

    // ✅ Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid items list" });
    }

    // ✅ Validate total amount
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    // ✅ Validate payment
    const payment = await Payment.findById(paymentId);
    if (!payment || payment.status !== "Completed") {
      return res.status(400).json({ message: "Invalid or incomplete payment" });
    }

    // ✅ Validate shipping address
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(400).json({ message: "Invalid address" });
    }

    // ✅ Deduct stock for each item
    for (const item of items) {
      const product = await Item.findById(item.item);
      if (!product) {
        return res.status(400).json({ message: `Item with ID ${item.item} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for item ${product.name}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // ✅ Create and save the order
    const order = new Order({
      user: userId, // ✅ Ensure user ID is stored as an ObjectId
      items,
      totalAmount,
      payment: payment._id,
      shippingAddress: address._id,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

// ✅ Get all orders for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate("items.item").populate("payment").populate("shippingAddress");
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
