import { Hono } from "hono";
import { volunteerController } from "../controllers/volunteerController.js";
import { validate, volunteerSchema } from "../utils/validation.js";

const volunteerRoutes = new Hono();

// Create volunteer
volunteerRoutes.post(
  "/",
  validate(volunteerSchema),
  volunteerController.createVolunteer,
);

// Get all volunteers
volunteerRoutes.get("/", volunteerController.getAllVolunteers);

// Get volunteer by ID
volunteerRoutes.get("/:id", volunteerController.getVolunteerById);

// Update volunteer
volunteerRoutes.put("/:id", volunteerController.updateVolunteer);

// Delete volunteer
volunteerRoutes.delete("/:id", volunteerController.deleteVolunteer);

export default volunteerRoutes;
