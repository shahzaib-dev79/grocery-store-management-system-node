require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

const User = require("./models/user.model");
const authRoutes = require("./routes/auth");
const CartRoutes = require("./routes/cart.js");
const userRoutes = require("./routes/userRoutes.js");
const wishlistRoutes = require("./routes/wishList.js");
const inventoryRoutes = require("./routes/inventoryroutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const supplierRoutes = require("./routes/supplierRoutes.js");
const marketingRoutes = require("./routes/marketingtools.js");
const app = express();

const dashboardRoutes = require("./routes/dashboard.js");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.get("/", (req, res) => res.send("Server Working ✅"));
app.use("/api/inventory", inventoryRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/v1/marketing", marketingRoutes);

app.get("/", (req, res) => res.send("Server Working "));

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/GSMS",
    );
    console.log("MongoDB Connected ");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.log("DB Connection Error:", error.message);
  }
};

startServer();
