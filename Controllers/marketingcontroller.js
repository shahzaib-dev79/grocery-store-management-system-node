const Marketing = require("../models/marketingModel");

// 1. Create Tool (Banner ya Discount)
exports.createTool = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file ? req.file.path : "" // Banner ke liye image path
    };
    const tool = await Marketing.create(data);
    res.status(201).json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Get All Tools
exports.getTools = async (req, res) => {
  try {
    const tools = await Marketing.find().sort({ createdAt: -1 });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete Tool
exports.deleteTool = async (req, res) => {
  try {
    await Marketing.findByIdAndDelete(req.params.id);
    res.json({ message: "Marketing tool deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
