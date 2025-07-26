const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const pic = req.file?.path;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please Enter all the Fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(String(password).trim(), 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: await generateToken(user._id),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ messsage: "All fields are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: await generateToken(user._id),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllUser = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find({
      ...keyword,
      _id: { $ne: req.user._id }, // exclude the current user
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getAllUser };
