const express = require("express");

const router = express.Router();
const supplierController = require("../Controllers/supplier");

// Create
router.post("/", supplierController.createSupplier);
// Read
router.get("/", supplierController.getSuppliers);
// Update
router.put("/:id", supplierController.updateSupplier);
// Delete
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
