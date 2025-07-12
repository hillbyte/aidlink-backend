import { Hono } from "hono";
import { centerController } from "../controllers/centerController.js";
import { validate, centerSchema } from "../utils/validation.js";

const centerRoutes = new Hono();

// Create center
centerRoutes.post("/", validate(centerSchema), centerController.createCenter);

// Get all centers
centerRoutes.get("/", centerController.getAllCenters);

// Get center by ID
centerRoutes.get("/:id", centerController.getCenterById);

// Update center
centerRoutes.put("/:id", centerController.updateCenter);

// Delete center
centerRoutes.delete("/:id", centerController.deleteCenter);

export default centerRoutes;
