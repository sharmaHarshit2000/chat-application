const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
dotenv.config();

const generateToken = async (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
  } catch (err) {
    return err.message;
  }
};

module.exports = generateToken;
