require("dotenv").config();
const express      = require("express");
const cors         = require("cors");
const cookieParser = require("cookie-parser");
const path         = require("path");
const connectDB    = require("./config/db");
const authRoutes   = require("./routes/authRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Connect DB ─────────────────────────────────── */
connectDB();

/* ── Global Middleware ──────────────────────────── */
app.use(cors({
  origin:      process.env.CLIENT_URL || "https://maison-lite.vercel.app", // ✅ no trailing slash
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Preflight requests handle karo
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

/* ── API Routes ─────────────────────────────────── */
// ✅ Yeh sab PEHLE aane chahiye - catch-all se upar

app.use("/api/auth", authRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok", time: new Date() }));

/* ── API 404 handler ────────────────────────────── */
app.use("/api/*", (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

/* ── HTML routes (sab se neeche) ────────────────── */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "404.html"));
});

/* ── Global error handler ───────────────────────── */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

app.listen(PORT, () => console.log(`✦ Server running on port ${PORT}`));