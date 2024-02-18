const Cotect = require("../models/controlModel");
const connectControl = async (req, res, next) => {
  try {
    const response = req.body;
    await Cotect.create(response);
    return res.status(200).json({ msg: "Message Sent Done!" });
  } catch (error) {
    let status = 500;
    let message = "Some problem in contextControl";
    let extraDetail = error;
    const erroo = { status, message, extraDetail };
    next(erroo);
  }
};

module.exports = { connectControl };
