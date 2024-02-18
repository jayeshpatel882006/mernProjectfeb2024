const express = require("express");
const {
  getalluserData,
  deleteUSer,
  editUSer,
} = require("../controler/adminControler");
const router = express.Router();

router.route("/getAllUser").get(getalluserData);
router.route("/deleteUser").post(deleteUSer);
router.route("/editUser").post(editUSer);

module.exports = router;
