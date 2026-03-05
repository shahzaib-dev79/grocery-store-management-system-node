const Cart = require("../models/cart");
const Product = require("../models/Productmodel");

//Create
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity || 1,
          },
        ],
        totalPrice: product.price * (quantity || 1),
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity || 1,
        });
      }

      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
    }

    res.status(201).json({
      success: true,
      cart,
      message: "Product has been added to cart successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured in adding product to cart",
      error: error.message,
    });
  }
};

//Get
const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Error occurred in fetching cart",
      error: error.message,
    });
  }
};

// Update

const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        msg: "Product not in cart",
      });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
      msg: "Cart item updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Error occurred in updating cart item",
      error: error.message,
    });
  }
};

//Delete

const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
      msg: "Product removed from cart successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Error occurred in removing product from cart",
      error: error.message,
    });
  }
};

// clear cart

const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
      msg: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Error occurred in clearing cart",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
