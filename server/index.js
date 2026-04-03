const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : new Pool({
      host:     process.env.DB_HOST || "localhost",
      user:     process.env.DB_USER || "postgres",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "influscout",
      port:     process.env.DB_PORT || 5432,
      ssl:      false,
    });

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS influencers_waitlist (
      id              SERIAL PRIMARY KEY,
      name            VARCHAR(100)     NOT NULL,
      email           VARCHAR(100)     NOT NULL UNIQUE,
      phone           VARCHAR(20),
      platform        VARCHAR(50),
      social_handle   VARCHAR(100),
      niche           VARCHAR(100),
      follower_count  INT,
      expected_rate   NUMERIC(10,2),
      tos_accepted    BOOLEAN          DEFAULT FALSE,
      tos_timestamp   TIMESTAMPTZ,
      ip_address      VARCHAR(50),
      created_at      TIMESTAMPTZ      DEFAULT NOW()
    )
  `);
  console.log("✅ Database table ready");
}

async function sendConfirmationEmail(to, name) {
  if (!process.env.EMAIL_USER) return;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: `"Influscout" <${process.env.EMAIL_USER}>`,
      to,
      subject: "You're on the Influscout waitlist! 🎉",
      html: `<div style="font-family:Arial,sans-serif;max-width:480px;background:#0a0a0f;color:#fff;padding:40px;border-radius:12px;">
        <h1 style="color:#f5c842;">Hey ${name} 👋</h1>
        <p style="color:#aaa;">You've joined the <strong style="color:#fff">Influscout</strong> creator waitlist.</p>
        <p style="color:#aaa;">Expect an exclusive invite when we go live. Keep creating! 🚀</p>
        <p style="color:#555;font-size:12px;">— Team Influscout</p>
      </div>`,
    });
  } catch (err) {
    console.error("Email error:", err.message);
  }
}

app.post("/api/waitlist", async (req, res) => {
  const { name, email, phone, platform, social_handle, niche, follower_count, expected_rate, tos_accepted } = req.body;
  if (!name || !email || !platform || !niche || !follower_count) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }
  if (!tos_accepted) {
    return res.status(400).json({ message: "You must accept the Terms of Service." });
  }
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  try {
    await pool.query(
      `INSERT INTO influencers_waitlist
        (name, email, phone, platform, social_handle, niche, follower_count, expected_rate, tos_accepted, tos_timestamp, ip_address)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [name, email, phone||null, platform, social_handle||null, niche,
       parseInt(follower_count)||0, parseFloat(expected_rate)||null,
       true, new Date(), ip]
    );
    sendConfirmationEmail(email, name);
    return res.status(201).json({ message: "Successfully joined the waitlist!", success: true });
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ message: "This email is already registered." });
    console.error("DB error:", err);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

app.get("/api/waitlist", async (req, res) => {
  if (req.headers["x-admin-secret"] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { rows } = await pool.query("SELECT * FROM influencers_waitlist ORDER BY created_at DESC");
    return res.json({ count: rows.length, data: rows });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/waitlist/count", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT COUNT(*) as total FROM influencers_waitlist");
    return res.json({ total: parseInt(rows[0].total) });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Influscout API running on port ${PORT}`));
}).catch(err => {
  console.error("❌ DB init failed:", err.message);
  console.error(err);
  process.exit(1);
});
