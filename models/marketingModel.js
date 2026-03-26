const mongoose = require("mongoose");

const MarketingSchema = new mongoose.Schema({
  type: { type: String, enum: ['discount', 'banner'], required: true },
  title: String,            // Banner Title ya Discount Name
  code: { type: String, unique: true, sparse: true }, // "SAVE50"
  value: Number,           // 50% discount
  image: String,           // Banner Image
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Marketing", MarketingSchema);
