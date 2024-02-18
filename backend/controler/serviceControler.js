const Service = require("../models/Services");

const service = async (req, res) => {
  try {
    const data = await Service.find();
    if (!data) {
      res.status(400).json({ msg: "Data Not Found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = service;
