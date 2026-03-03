const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

const auth = require("../middleware/authMiddleware");

router.post("/add", auth, addToWishlist);
router.get("/get", auth, getWishlist);
router.delete("/remove:id", auth, removeFromWishlist);
router.delete("/delete", auth, clearWishlist);

module.exports = router;