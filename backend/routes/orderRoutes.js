// const express = require("express");
// const Order = require("../models/Order");
// const Item = require("../models/Item"); // Import Item model
// const router = express.Router();

// // ✅ Create an Order & Update Stock
// router.post("/", async (req, res) => {
//   try {
//     const { user, items, totalAmount, paymentMethod, shippingAddress } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in the order" });
//     }

//     // Check if all items have enough stock
//     for (const orderItem of items) {
//       const item = await Item.findById(orderItem.item);
//       if (!item) {
//         return res.status(404).json({ message: `Item not found: ${orderItem.item}` });
//       }
//       if (item.stock < orderItem.quantity) {
//         return res.status(400).json({ message: `Not enough stock for ${item.name}` });
//       }
//     }

//     // Reduce stock for each item
//     for (const orderItem of items) {
//       await Item.findByIdAndUpdate(orderItem.item, {
//         $inc: { stock: -orderItem.quantity },
//       });
//     }

//     // Create the order
//     const order = new Order({
//       user,
//       items,
//       totalAmount,
//       paymentMethod,
//       shippingAddress,
//     });

//     await order.save();
//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (error) {
//     res.status(500).json({ message: "Error placing order", error: error.message });
//   }
// });

// module.exports = router;



// const express = require("express");
// const Order = require("../models/Order");
// const Payment = require("../models/Payment");
// const Address = require("../models/Address");
// const router = express.Router();

// // Create a new order
// router.post("/", async (req, res) => {
//   try {
//     const { user, items, totalAmount, paymentId, addressId } = req.body;

//     // Validate payment
//     const payment = await Payment.findById(paymentId);
//     if (!payment || payment.status !== "Completed") {
//       return res.status(400).json({ message: "Invalid or incomplete payment" });
//     }

//     // Validate address
//     const address = await Address.findById(addressId);
//     if (!address) {
//       return res.status(400).json({ message: "Invalid address" });
//     }

//     // Create the order
//     const order = new Order({
//       user,
//       items,
//       totalAmount,
//       payment: paymentId,
//       shippingAddress: addressId,
//     });

//     await order.save();

//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error placing order", error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Address = require("../models/Address");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// ✅ Create a new order (Authenticated users only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, paymentId, addressId } = req.body;
    const userId = req.user; // Extracted from JWT token

    // ✅ Validate ObjectId format
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
console.log("Payment Found:", payment); // Debugging log

if (!payment) {
  return res.status(400).json({ message: "Payment not found" });
}

if (payment.status !== "Completed") {
  return res.status(400).json({ message: `Payment status is '${payment.status}', not 'Completed'` });
}


    // ✅ Validate shipping address
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(400).json({ message: "Invalid address" });
    }

    // ✅ Debugging logs
    console.log("User ID:", userId);
    console.log("Payment Found:", payment);
    console.log("Address Found:", address);
    console.log("Items:", items);
    console.log("Total Amount:", totalAmount);

    // ✅ Create and save the order
    const order = new Order({
      user: userId,
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
    const userId = req.user;
    const orders = await Order.find({ user: userId }).populate("items.item").populate("payment").populate("shippingAddress");
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
