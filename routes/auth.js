const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

/**
 * Auth Routes
 * Handles all authentication related endpoints
 */

// POST /auth/register - Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new user (in production, hash the password!)
    const user = await User.create({
      name,
      email,
      password, // In production: await bcrypt.hash(password, 10)
      role: role || "cashier",
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = {
      id: user._id,
      username: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /auth/login - Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password (in production: await bcrypt.compare(password, user.password))
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = {
      id: user._id,
      username: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /auth/me - Get current user (protected route)
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// PUT /auth/profile - Update user profile (protected route)
router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
