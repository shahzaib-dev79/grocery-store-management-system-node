const Order = require("../models/order.model.js");
const User = require("../models/user.model.js");
const Product = require("../models/Productmodel.js");
const Supplier = require("../models/suppliermodel.js");
const Inventory = require("../models/inventorymodels.js");
const Cart = require("../models/cart.js");
const Wishlist = require("../models/wishList.js");

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalCartItems = await Cart.countDocuments();
    const totalWishlistItems = await Wishlist.countDocuments();

    const stockAgg = await Inventory.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$quantity" } } },
    ]);
    const totalStock = stockAgg[0]?.totalStock || 0;
    const ordersByDay = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const ordersTrend = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const topSellingProducts = await Order.aggregate([
      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.productName",
          sold: { $sum: "$items.quantity" },
        },
      },

      { $sort: { sold: -1 } },
      { $limit: 5 },

      {
        $project: {
          name: "$_id",
          sold: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalUsers,
      totalProducts,
      totalStock,
      totalSuppliers,
      totalCartItems,
      totalWishlistItems,
      ordersTrend,
      ordersByDay,
      topSellingProducts,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching dashboard stats",
      error: error.message,
    });
    console.log(topSellingProducts);
  }
};

module.exports = { getDashboardStats };
