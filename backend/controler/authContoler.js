const User = require("../models/UserModel");
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      // console.log("user Exist");
      return res.json("User Already Exist ");
    }
    const UserCreate = await User.create({ username, email, phone, password });
    res.json({
      token: await UserCreate.generateToken(),
    });
  } catch (error) {
    res.json("internal servar errore");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.json("Not Valid User Mail");
    }

    let isPassValid = false;
    let isActive = userExist.active;
    if (password == userExist.password) {
      isPassValid = true;
    }

    if (isPassValid && isActive) {
      return res.json({
        msg: "Login Succsesfully",
        userId: userExist._id,
        token: await userExist.generateToken(),
      });
    } else {
      if (!isActive) {
        return res.json("User is not active.");
      }
      res.json("Something is nOt Valid");
    }
  } catch (error) {
    res.json("internal servar errore");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log("from control", userData);
    return res.json(userData);
  } catch (error) {
    res.json(error);
  }
};
module.exports = { register, login, user };
