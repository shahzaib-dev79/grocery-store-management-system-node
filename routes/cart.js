const express = require("express");

const {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../Controllers/cart");

const { authenticateKWT } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/cart", authenticateKWT, addToCart);
router.get("/cart", authenticateKWT, getCart);
router.put("/cart", authenticateKWT, updateCartItem);
router.delete("/cart/item", authenticateKWT, deleteCartItem);
router.put("/cart/clear", authenticateKWT, clearCart);
