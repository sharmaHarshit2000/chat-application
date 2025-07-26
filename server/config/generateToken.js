const jwt = require("jsonwebtoken")

const generateToken = async (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
  } catch (err) {
    return err.message;
  }
};

module.exports = generateToken;
