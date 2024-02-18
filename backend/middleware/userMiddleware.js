const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorize");
  const SecraetKey = "uihfg785e6893j@78yfggjhvbjkjbksjdhwie7rughksliqwoieiugbv";
  if (!token) {
    return res.json("You Dont't have any Token For Authorization");
  }
  try {
    const isVarify = jwt.verify(token, SecraetKey);
    // console.log(isVarify);
    const user = await User.findOne({ email: isVarify.email }).select({
      password: 0,
    });
    // console.log("fromMiddleware", user);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = authMiddleware;
