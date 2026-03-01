const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAllUsers,
  deleteUser,
} = require("../Controllers/user.js");

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", getAllUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;
