const Order = require("../models/order.model.js");

//creating a new order
const createOrder = async (req, res) => {
  try {
    const { customerName, items, totalAmount,} = req.body;
    
    const newOrder = await Order.create({
      customerName,
      items,
      totalAmount,
    });

    res.status(201).json({ msg: "Order successfully created!", newOrder });
  } catch (error) {
    res.status(400).json({ msg: "Error creating order", error: error.message });
  }
};
//getting all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("receivedBy", "firstName lastName email");
    res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, getAllOrders };