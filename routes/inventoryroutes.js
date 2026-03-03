const express = require("express");
const router = express.Router();
// corrected path/filename to match actual file (inventorycontrollers.js)
const inventoryController = require("../Controllers/inventorycontrollers");

// Create
router.post("/", inventoryController.createInventory);

// Read
router.get("/", inventoryController.getAllInventory);

// Update
router.put("/:id", inventoryController.updateInventory);

// Delete
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;