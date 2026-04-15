const Order = require("../models/order.model.js");
const Product = require("../models/Productmodel.js");

const createOrder = async (req, res) => {
  try {
    const { customerId, customerName, items, totalAmount, status } = req.body;

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          msg: `Product not found: ${item.productName}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          msg: `Insufficient stock for ${product.name}`,
        });
      }
    }
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

    for (let item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(201).json({
      msg: "Order successfully created!",
      newOrder,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error creating order",
      error: error.message,
    });
  }
};

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
