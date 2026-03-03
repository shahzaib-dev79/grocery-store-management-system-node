const express = require('express');

const router = express.Router();
const supplierController = require('../Controllers/supplierControllers');

// Create
router.post('/', supplierController.createSupplier);
// Read
router.get('/', supplierController.getAllSuppliers);
// Update
router.put('/:id', supplierController.updateSupplier);
// Delete
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;