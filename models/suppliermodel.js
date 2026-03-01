const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Supplier name is required'],
        minlength: [2, 'Supplier name must be at least 2 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Supplier', supplierSchema);