// backend/controllers/authController.js
const User       = require("../models/User");
const crypto     = require("crypto");
const sendEmail  = require("../utils/sendEmail");

/* ── Helper: Send token response ─────────────────── */
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires:  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user: {
      id:    user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
    },
  });
};

/* ══════════════════════════════════════════════════
   POST /api/auth/signup
══════════════════════════════════════════════════ */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    const user = await User.create({ name, email, password });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ══════════════════════════════════════════════════
   POST /api/auth/login
══════════════════════════════════════════════════ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ══════════════════════════════════════════════════
   GET /api/auth/me
══════════════════════════════════════════════════ */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ══════════════════════════════════════════════════
   POST /api/auth/logout
══════════════════════════════════════════════════ */
exports.logout = (req, res) => {
  res.cookie("token", "none", { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

/* ══════════════════════════════════════════════════
   POST /api/auth/forgot-password
══════════════════════════════════════════════════ */
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No user found with that email" });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message  = `You requested a password reset. Click here to reset:\n\n${resetUrl}\n\nIf you didn't request this, please ignore.`;

    try {
      await sendEmail({
        email:   user.email,
        subject: "Password Reset Request — Maison Élite",
        message,
      });
      res.status(200).json({ success: true, message: "Reset link sent to email" });
    } catch (err) {
      // *** ERROR LOGGING ADDED ***
      console.error("═══════════════════════════════");
      console.error("EMAIL ERROR:", err.message);
      console.error("FULL ERROR:", err);
      console.error("═══════════════════════════════");

      user.resetPasswordToken  = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: "Email could not be sent" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ══════════════════════════════════════════════════
   PUT /api/auth/reset-password/:token
══════════════════════════════════════════════════ */
exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    user.password            = req.body.password;
    user.resetPasswordToken  = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};