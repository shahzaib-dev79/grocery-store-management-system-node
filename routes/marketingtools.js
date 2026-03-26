const express = require("express");
const router = express.Router();
const marketingController = require("../Controllers/marketingcontroller");
const multer = require("multer");
const path = require("path");

// 1. Image Storage Setup (Banners ke liye)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 2. Marketing Routes
// upload.single('image') modal mein file input ke name se match hona chahiye
router.post("/", upload.single('image'), marketingController.createTool);
router.get("/", marketingController.getTools);
router.delete("/:id", marketingController.deleteTool);

module.exports = router;
