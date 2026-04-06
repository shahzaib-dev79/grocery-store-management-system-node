const Order = require("../models/order.model.js");

const createOrder = async (req, res) => {
  try {
    const { customerId, customerName, items, totalAmount, status } = req.body;

    const newOrder = await Order.create({
      customerId: customerId || null,
      customerName,
      items: items.map((i) => ({
        productId: i.productId || null,
        productName: i.productName,
        quantity: i.quantity,
        price: i.price,
      })),
      totalAmount,
      status: status || "pending",
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

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json({ msg: "Order updated", updatedOrder });
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
  updateOrder,
  deleteOrder,
};
