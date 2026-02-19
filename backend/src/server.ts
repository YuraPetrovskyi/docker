import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();

const app = express();

app.use(cors()); // allow frontend requests in dev
app.use(express.json()); // parse JSON bodies

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/employees", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, role_title, email, created_at
        FROM employees
        ORDER BY created_at DESC`,
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
