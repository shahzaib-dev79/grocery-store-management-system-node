const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("./../Controllers/wishList");

const auth = require("../middleware/authmiddleware");

router.post("/add", auth, addToWishlist);
router.get("/get", auth, getWishlist);
router.delete("/remove/:id", auth, removeFromWishlist);
router.delete("/delete", auth, clearWishlist);

module.exports = router;
