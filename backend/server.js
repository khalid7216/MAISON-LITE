// backend/server.js
require("dotenv").config();
const express      = require("express");
const cors         = require("cors");
const cookieParser = require("cookie-parser");
const connectDB    = require("./config/db");
const authRoutes   = require("./routes/authRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Connect DB ─────────────────────────────────── */
connectDB();

/* ── Global Middleware ──────────────────────────── */
app.use(cors({
  origin:      process.env.CLIENT_URL || "https://maison-lite.vercel.app/",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
const path = require("path");

// ── Index route ──────────────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ── Catch-all route ───────────────────────────────
app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
  }
  res.sendFile(path.join(__dirname, "404.html"));
});

/* ── Routes ─────────────────────────────────────── */
app.use("/api/auth", authRoutes);

/* ── Health check ───────────────────────────────── */
app.get("/api/health", (_, res) => res.json({ status: "ok", time: new Date() }));

/* ── 404 handler ────────────────────────────────── */
app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
);

/* ── Global error handler ───────────────────────── */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

app.listen(PORT, () => console.log(`✦ Server running on port ${PORT}`));
