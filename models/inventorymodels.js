const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        supplier: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);