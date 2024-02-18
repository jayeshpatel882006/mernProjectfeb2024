const express = require("express");
const router = express.Router();
const control = require("../controler/contectControl");
const validatemiddleware = require("../middleware/contectmiddleware");
const validator = require("../Validator/contectValidator");

router.route("/").post(validatemiddleware(validator), control.connectControl);

module.exports = router;
