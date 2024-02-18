const express = require("express");
const service = require("../controler/serviceControler");
const router = express.Router();

router.route("/").get(service);
module.exports = router;
