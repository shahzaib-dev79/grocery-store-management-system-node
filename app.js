require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/user.model");
const authRoutes = require("./routes/auth");

const CartRoutes = require("./routes/cart.js");
const userRoutes = require("./routes/userRoutes.js");
const wishlistRoutes = require("./routes/wishList.js");
const inventoryRoutes = require("./routes/inventoryroutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const supplierRoutes = require("./routes/supplierRoutes.js");


const app = express();

app.use(cors({}));
app.use(express.json());

app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/api/v1/suppliers", supplierRoutes);

app.get("/", (req, res) => res.send("Server Working ✅"));
app.use("/api/inventory", inventoryRoutes);
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
