const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, enum: ["COD", "Card"], required: true },
    transactionId: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    cardDetails: {
      cardNumber: { type: String },
      expiryDate: { type: String },
      cvv: { type: String }
    }
  },
  { timestamps: true }
);

// Ensure card details are entered only when the payment method is "Card"
PaymentSchema.pre("save", function (next) {
  if (this.paymentMethod === "COD" && this.cardDetails) {
    return next(new Error("Card details should not be entered for COD payments."));
  }
  if (this.paymentMethod === "Card" && !this.cardDetails?.cardNumber) {
    return next(new Error("Card details are required for card payments."));
  }
  next();
});

module.exports = mongoose.model("Payment", PaymentSchema);
