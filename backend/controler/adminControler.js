const User = require("../models/UserModel");

const getalluserData = async (req, res) => {
  try {
    const alldata = await User.find();
    res.json(alldata);
  } catch (error) {
    res.json(error);
  }
};

const deleteUSer = async (req, res) => {
  let { _id } = req.body;
  try {
    let deleet = await User.deleteOne({ _id: _id });
    if (deleet.deletedCount != "0") {
      // return res.json("No User was deleted");s
      return res.json("User DELETED SuccessFully");
    }
    return res.json(deleet);
  } catch (error) {
    res.json(error);
  }
};

const editUSer = async (req, res) => {
  const { username, phone, password, email, isAdmin, _id, active } = req.body;
  try {
    let idUpdated = await User.updateOne(
      { _id: _id },
      {
        $set: {
          username: username,
          phone: phone,
          password: password,
          email: email,
          isAdmin: isAdmin,
          active: active,
        },
      }
    );
    res.json(idUpdated);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getalluserData, deleteUSer, editUSer };
