const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require("../Controllers/order.js");

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.get("/:id", getSingleOrder);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
