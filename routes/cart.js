const express = require("express");

const {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../Controllers/cart");

const authenticateJWT = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", authenticateJWT, addToCart);
router.get("/", authenticateJWT, getCart);
router.put("/", authenticateJWT, updateCartItem);
router.delete("/item", authenticateJWT, deleteCartItem);
router.put("/clear", authenticateJWT, clearCart);

module.exports = router;
