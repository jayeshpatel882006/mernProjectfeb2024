const { Schema, model } = require("mongoose");

const ContectSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const Contect = new model("Contect", ContectSchema);
module.exports = Contect;
