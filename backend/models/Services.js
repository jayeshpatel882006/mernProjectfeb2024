const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  services: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  provider: { type: String, required: true },
});

const Service = new model("service", ServiceSchema);
module.exports = Service;
