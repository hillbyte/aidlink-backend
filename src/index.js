import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { pool } from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
  } else {
    console.log("Database connected successfully");
  }
});

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server running on ${HOST}:${PORT}`);
