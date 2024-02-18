const express = require("express");
const router = express.Router();
const control = require("../controler/authContoler");
const validate = require("../middleware/validatorMidleware");
const loginvalidate = require("../middleware/Loginvalidator");
const signupSchema = require("../Validator/authValidation");
const loginValidat = require("../Validator/loginVakidator");
const userMiddleware = require("../middleware/userMiddleware");

router.route("/signup").post(validate(signupSchema), control.register);
router.route("/login").post(loginvalidate(loginValidat), control.login);
// router.route("/user").get(control.user);
router.route("/user").get(userMiddleware, control.user);

module.exports = router;
