const Cart = require("../models/card");

exports.addToCart = async (req, res) => {
  try {
    const cartItem = await Cart.create(req.body);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const updatedCartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedCartItem);
};

exports.deleteCartItem = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Cart item deleted" });
};
