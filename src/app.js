import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import donationRoutes from "./routes/donationRoutes.js";
import centerRoutes from "./routes/centerRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

app.get("/", (c) =>
  c.json({ status: "OK", message: "AidLink API is running" }),
);

// Routes
app.route("/api/donations", donationRoutes);
app.route("/api/centers", centerRoutes);
app.route("/api/volunteers", volunteerRoutes);
app.route("/api/contact", contactRoutes);

// Error handling
app.onError(errorHandler);

export { app };
