const express = require("express");
const router = express.Router();
const {
  register,
  verifyOTP,
  login,
  getProfile,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/user-middleware");

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
