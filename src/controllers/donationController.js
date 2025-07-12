import { donationModel } from "../models/donationModel.js";
import { sendEmail } from "../services/emailService.js";

export const donationController = {
  // Create a new donation
  createDonation: async (c) => {
    try {
      const body = c.get("validated-body");

      // Create donation in database
      const donation = await donationModel.create(body);

      // Send confirmation email
      await sendEmail(donation.donor_email, "donationReceived", donation);

      return c.json(
        {
          message: "Donation request submitted successfully",
          data: donation,
        },
        201,
      );
    } catch (error) {
      console.error("Error creating donation:", error);
      throw error;
    }
  },

  // Get all donations
  getAllDonations: async (c) => {
    try {
      const { status, center_id } = c.req.query();
      const filters = {};

      if (status) filters.status = status;
      if (center_id) filters.center_id = parseInt(center_id, 10);

      const donations = await donationModel.getAll(filters);
      return c.json({ data: donations });
    } catch (error) {
      console.error("Error getting donations:", error);
      throw error;
    }
  },

  // Get donation by ID
  getDonationById: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const donation = await donationModel.getById(id);

      if (!donation) {
        throw new Error("Not found");
      }

      return c.json({ data: donation });
    } catch (error) {
      console.error("Error getting donation:", error);
      throw error;
    }
  },

  // Update donation
  updateDonation: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const body = await c.req.json();

      const existingDonation = await donationModel.getById(id);
      if (!existingDonation) {
        throw new Error("Not found");
      }

      const updatedDonation = await donationModel.update(id, body);

      return c.json({
        message: "Donation updated successfully",
        data: updatedDonation,
      });
    } catch (error) {
      console.error("Error updating donation:", error);
      throw error;
    }
  },

  // Delete donation
  deleteDonation: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);

      const existingDonation = await donationModel.getById(id);
      if (!existingDonation) {
        throw new Error("Not found");
      }

      await donationModel.delete(id);

      return c.json({
        message: "Donation deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting donation:", error);
      throw error;
    }
  },
};
