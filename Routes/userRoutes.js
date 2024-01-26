const express = require("express");
const {
  registerUser,
  authUser,
  logoutUser,
} = require("../Controllers/userControllers");

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

module.exports = router;
