const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/card");

router.post("/", cartController.addToCart);
router.get("/", cartController.getCartItems);
router.put("/:id", cartController.updateCartItem);
router.delete("/:id", cartController.deleteCartItem);

module.exports = router;
