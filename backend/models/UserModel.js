const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  date: {
    createdAt: {
      type: String,
      default: moment().format("DD-MM-YYYY"),
    },
    updatedAt: {
      type: String,
    },
  },
});
const SecraetKey = "uihfg785e6893j@78yfggjhvbjkjbksjdhwie7rughksliqwoieiugbv";
UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userID: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      SecraetKey
    );
  } catch (error) {
    console.error(error);
  }
};

const User = new mongoose.model("User", UserSchema);
module.exports = User;
