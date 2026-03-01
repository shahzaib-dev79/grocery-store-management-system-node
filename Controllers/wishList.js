const { default: mongoose } = require("mongoose");
const Wishlist = require("../models/wishList");



const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user.userId,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({ msg: "Already in wishlist" });
    }

    const item = await Wishlist.create({
      user: req.user.userId,
      product: productId,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const getWishlist = async (req, res) => {
  try {
    const list = await Wishlist.find({ user: req.user.userId })
      .populate("product");

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Wishlist.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.json({ msg: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const clearWishlist = async (req, res) => {
  try {
    await Wishlist.deleteMany({ user: req.user.userId });

    res.json({ msg: "Wishlist cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = mongoose.model("Wishlist", wishlistSchema);
module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};