const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true }, // Fixed field name
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true }, // Fixed field name
    status: { type: String, enum: ["Pending", "Processing", "Completed", "Cancelled"], default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
