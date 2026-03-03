const Supplier = require('../models/supplier');

// Create a new supplier
const createSupplier = async (req, res) => {
  try {
    const { name, contactInfo } = req.body;
    if (!name || !contactInfo) {
      return res.status(400).json({ success: false, message: 'Name and contact information are required' });
    }
    const newSupplier = await Supplier.create({ name, contactInfo });
    res.status(201).json({ success: true, data: newSupplier });
  }
    catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

// Get all suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json({ success: true, data: suppliers });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

// Get a supplier by ID
const getSupplierById = async (req, res) => {
    try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
     return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    res.status(200).json({ success: true, data: supplier });
    }
    catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

// Update a supplier
const updateSupplier = async (req, res) => {
    try {
    const { name, contactInfo } = req.body;
    const updatedSupplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        { name, contactInfo },
        { new: true }
    );
    if (!updatedSupplier) {
     return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    res.status(200).json({ success: true, data: updatedSupplier });
    }
    catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

// Delete a supplier
const deleteSupplier = async (req, res) => {
    try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
     return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    res.status(200).json({ success: true, message: 'Supplier deleted successfully' });
    }
    catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};
