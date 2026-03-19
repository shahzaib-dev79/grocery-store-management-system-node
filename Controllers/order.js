const Order = require("../models/order.model.js");

// Create a new order
const createOrder = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  try {
    const { customerId, customerName, items, totalAmount } = req.body;

    const newOrder = await Order.create({
      customerId,
      customerName,
      items,
      totalAmount,
    });

    res.status(201).json({ msg: "Order successfully created!", newOrder });
  } catch (error) {
    res.status(400).json({ msg: "Error creating order", error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      "customerId",
      "firstName lastName email",
    );
    res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Order
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ msg: `No order found with id: ${id}` });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true, runValidators: true },
    );

    if (!order) {
      return res.status(404).json({ msg: `No order found with id: ${id}` });
    }
    res.status(200).json({ msg: "Order has been cancelled", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ msg: `No order found with id: ${id}` });
    }
    res.status(200).json({ msg: "Order deleted successfully from the system" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  cancelOrder,
  deleteOrder,
};
