
const Wishlist = require("../models/wishList");



const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user.userId,
      product: productId,
    });

    if (exists) {
     return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const item = await Wishlist.create({
      user: req.user.userId,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist successfully",
      data: item,
    });
  } catch (err) {
     res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
      error: err.message, });
  }
};




const getWishlist = async (req, res) => {
  try {
    const list = await Wishlist.find({ user: req.user.userId })
      .populate("product");

    res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      totalItems: list.length,
      data: list,
    });
   } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: err.message,
    });
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
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
    });
    } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: err.message,
    });
  }
};




const clearWishlist = async (req, res) => {
  try {
    await Wishlist.deleteMany({ user: req.user.userId });

     res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to clear wishlist",
      error: err.message,
    });
  }
};
module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};