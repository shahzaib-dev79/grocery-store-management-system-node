const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/user.model.js");
const Cart = require("./models/cart.js");

const CartRoutes = require("./routes/cart.js");
const userRoutes = require("./routes/userRoutes.js");
const wishlistRoutes = require("./routes/wishlistRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => res.send("Server Working ✅"));

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.use("/api/wishlist", wishlistRoutes);
const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/GSMS");
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.log("DB Connection Error:", error.message);
  }
};

startServer();
