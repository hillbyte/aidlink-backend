import { contactModel } from "../models/contactModel.js";
import { sendEmail } from "../services/emailService.js";

export const contactController = {
  // Create a new contact message
  createContact: async (c) => {
    try {
      const body = c.get("validated-body");

      // Create contact in database
      const contact = await contactModel.create(body);
      console.log(contact);

      // Send confirmation email
      await sendEmail(contact.email, "contactReceived", contact);

      return c.json(
        {
          message: "Contact message submitted successfully",
          data: contact,
        },
        201,
      );
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },

  // Get all contact messages
  getAllContacts: async (c) => {
    try {
      const { responded } = c.req.query();
      const filters = {};

      if (responded !== undefined) {
        filters.responded = responded === "true";
      }

      const contacts = await contactModel.getAll(filters);
      return c.json({ data: contacts });
    } catch (error) {
      console.error("Error getting contacts:", error);
      throw error;
    }
  },

  // Get contact by ID
  getContactById: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const contact = await contactModel.getById(id);

      if (!contact) {
        throw new Error("Not found");
      }

      return c.json({ data: contact });
    } catch (error) {
      console.error("Error getting contact:", error);
      throw error;
    }
  },

  // Update contact (mark as responded)
  updateContact: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const body = await c.req.json();

      const existingContact = await contactModel.getById(id);
      if (!existingContact) {
        throw new Error("Not found");
      }

      const updatedContact = await contactModel.update(id, body);

      return c.json({
        message: "Contact updated successfully",
        data: updatedContact,
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  },

  // Delete contact
  deleteContact: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);

      const existingContact = await contactModel.getById(id);
      if (!existingContact) {
        throw new Error("Not found");
      }

      await contactModel.delete(id);

      return c.json({
        message: "Contact deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },
};
