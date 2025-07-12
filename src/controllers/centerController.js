import { centerModel } from "../models/centerModel.js";

export const centerController = {
  // Create a new center
  createCenter: async (c) => {
    try {
      const body = c.get("validated-body");
      const center = await centerModel.create(body);

      return c.json(
        {
          message: "Donation center created successfully",
          data: center,
        },
        201,
      );
    } catch (error) {
      console.error("Error creating center:", error);
      throw error;
    }
  },

  // Get all centers
  getAllCenters: async (c) => {
    try {
      const {
        city,
        state,
        accepts_clothing,
        accepts_accessories,
        accepts_household,
      } = c.req.query();
      const filters = {};

      if (city) filters.city = city;
      if (state) filters.state = state;

      if (accepts_clothing !== undefined) {
        filters.accepts_clothing = accepts_clothing === "true";
      }

      if (accepts_accessories !== undefined) {
        filters.accepts_accessories = accepts_accessories === "true";
      }

      if (accepts_household !== undefined) {
        filters.accepts_household = accepts_household === "true";
      }

      const centers = await centerModel.getAll(filters);
      return c.json({ data: centers });
    } catch (error) {
      console.error("Error getting centers:", error);
      throw error;
    }
  },

  // Get center by ID
  getCenterById: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const center = await centerModel.getById(id);

      if (!center) {
        throw new Error("Not found");
      }

      return c.json({ data: center });
    } catch (error) {
      console.error("Error getting center:", error);
      throw error;
    }
  },

  // Update center
  updateCenter: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);
      const body = await c.req.json();

      const existingCenter = await centerModel.getById(id);
      if (!existingCenter) {
        throw new Error("Not found");
      }

      const updatedCenter = await centerModel.update(id, body);

      return c.json({
        message: "Center updated successfully",
        data: updatedCenter,
      });
    } catch (error) {
      console.error("Error updating center:", error);
      throw error;
    }
  },

  // Delete center
  deleteCenter: async (c) => {
    try {
      const id = parseInt(c.req.param("id"), 10);

      const existingCenter = await centerModel.getById(id);
      if (!existingCenter) {
        throw new Error("Not found");
      }

      await centerModel.delete(id);

      return c.json({
        message: "Center deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting center:", error);
      throw error;
    }
  },
};
