import { Hono } from "hono";
import { donationController } from "../controllers/donationController.js";
import { validate, donationSchema } from "../utils/validation.js";

const donationRoutes = new Hono();

// Create donation
donationRoutes.post(
  "/",
  validate(donationSchema),
  donationController.createDonation,
);

// Get all donations
donationRoutes.get("/", donationController.getAllDonations);

// Get donation by ID
donationRoutes.get("/:id", donationController.getDonationById);

// Update donation
donationRoutes.put("/:id", donationController.updateDonation);

// Delete donation
donationRoutes.delete("/:id", donationController.deleteDonation);

export default donationRoutes;
