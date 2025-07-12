import { Hono } from "hono";
import { contactController } from "../controllers/contactController.js";
import { validate, contactSchema } from "../utils/validation.js";

const contactRoutes = new Hono();

// Create contact
contactRoutes.post(
  "/",
  validate(contactSchema),
  contactController.createContact,
);

// Get all contacts
contactRoutes.get("/", contactController.getAllContacts);

// Get contact by ID
contactRoutes.get("/:id", contactController.getContactById);

// Update contact
contactRoutes.put("/:id", contactController.updateContact);

// Delete contact
contactRoutes.delete("/:id", contactController.deleteContact);

export default contactRoutes;
