// backend/routes/authRoutes.js
const express = require("express");
const router  = express.Router();
const {
  signup,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/signup",              signup);
router.post("/login",               login);
router.get ("/logout",              logout);
router.get ("/me",                  protect, getMe);
router.post("/forgot-password",     forgotPassword);
router.put ("/reset-password/:token", resetPassword);

module.exports = router;
