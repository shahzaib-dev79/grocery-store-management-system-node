const User = require("../models/user.model.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

// To Register Admin/User
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } =
      req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Passwords do not match. Please try again!" });
    }

    // if (role === "admin") {
    //   const isAdminExist = await User.findOne({ role: "admin" });
    //   if (isAdminExist) {
    //     return res.status(403).json({
    //       msg: "Admin already exists.",
    //     });
    //   }
    // }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Email already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "cashier",
    });
    res.status(StatusCodes.CREATED).json({
      msg: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }

  // const token = user.createJWT();

  // res.status(StatusCodes.CREATED).json({
  //     user: {
  //         _id: user._id,
  //         name: `${user.firstName} ${user.lastName}`,
  //         role: user.role,
  //     },
  //     token,
  // });
};

// To Login Admin/User
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    console.log();
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    res.status(StatusCodes.OK).json({
      msg: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
// const token = user.createJWT();

// res.status(StatusCodes.OK).json({
//     user: {
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//     },
//     token,
// });

//Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({
    count: users.length,
    users,
  });
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ msg: `No user found with id: ${id}` });
  }
  res.status(200).json({ msg: "Success! User removed from the system." });
};
module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
};
