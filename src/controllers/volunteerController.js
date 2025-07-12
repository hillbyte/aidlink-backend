import { volunteerModel } from "../models/volunteerModel.js";
import { sendEmail } from "../services/emailService.js";

export const volunteerController = {
  // Create a new volunteer
  createVolunteer: async (c) => {
    try {
      const body = c.get("validated-body");

      // Create volunteer in database
      const volunteer = await volunteerModel.create(body);

      // Send confirmation email
      await sendEmail(volunteer.email, "volunteerRegistration", volunteer);

      return c.json(
        {
          message: "Volunteer registration submitted successfully",
          data: volunteer,
        },
        201,
      );
    } catch (error) {
      console.error("Error creating volunteer:", error);
      throw error;
    }
  },

  // Get all volunteers
  getAllVolunteers: async (c) => {
    try {
      const { status, preferred_center_id } = c.req.query();
      const filters = {};

      if (status) filters.status = status;
      if (preferred_center_id)
        filters.preferred_center_id = parseInt(preferred_center_id, 10);

      const volunteers = await volunteerModel.getAll(filters);
      return c.json({ data: volunteers });
    } catch (error) {
      console.error("Error getting volunteers:", error);
      throw error;
    }
  },

  // Get volunteer by ID
  getVolunteerById: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const volunteer = await volunteerModel.getById(id);

      if (!volunteer) {
        throw new Error("Not found");
      }

      return c.json({ data: volunteer });
    } catch (error) {
      console.error("Error getting volunteer:", error);
      throw error;
    }
  },

  // Update volunteer
  updateVolunteer: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const body = await c.req.json();

      const existingVolunteer = await volunteerModel.getById(id);
      if (!existingVolunteer) {
        throw new Error("Not found");
      }

      const updatedVolunteer = await volunteerModel.update(id, body);

      return c.json({
        message: "Volunteer updated successfully",
        data: updatedVolunteer,
      });
    } catch (error) {
      console.error("Error updating volunteer:", error);
      throw error;
    }
  },

  // Delete volunteer
  deleteVolunteer: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);

      const existingVolunteer = await volunteerModel.getById(id);
      if (!existingVolunteer) {
        throw new Error("Not found");
      }

      await volunteerModel.delete(id);

      return c.json({
        message: "Volunteer deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      throw error;
    }
  },
};
