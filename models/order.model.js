const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: { type: String, required: true },

    items: [
      {
        productName: { type: String, required: true },

        quantity: { type: Number, required: true },

        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "processed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
