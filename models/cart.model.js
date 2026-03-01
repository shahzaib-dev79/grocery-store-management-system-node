const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {    
        type: Number,
        required: true,
    }, 
}, 
{ timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);