import { pool } from "../db/index.js";

export const centerModel = {
  // Create a new center
  create: async (centerData) => {
    const {
      name,
      address,
      city,
      state,
      zip,
      phone,
      email,
      hours,
      accepts_clothing,
      accepts_accessories,
      accepts_household,
    } = centerData;

    const query = `
      INSERT INTO centers (
        name, address, city, state, zip, phone, email,
        hours, accepts_clothing, accepts_accessories, accepts_household
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const values = [
      name,
      address,
      city,
      state,
      zip,
      phone,
      email,
      hours,
      accepts_clothing,
      accepts_accessories,
      accepts_household,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all centers with optional filtering
  getAll: async (filters = {}) => {
    let query = "SELECT * FROM centers";
    const values = [];
    const conditions = [];

    if (filters.city) {
      values.push(filters.city);
      conditions.push(`city = $${values.length}`);
    }

    if (filters.state) {
      values.push(filters.state);
      conditions.push(`state = $${values.length}`);
    }

    if (filters.accepts_clothing !== undefined) {
      values.push(filters.accepts_clothing);
      conditions.push(`accepts_clothing = $${values.length}`);
    }

    if (filters.accepts_accessories !== undefined) {
      values.push(filters.accepts_accessories);
      conditions.push(`accepts_accessories = $${values.length}`);
    }

    if (filters.accepts_household !== undefined) {
      values.push(filters.accepts_household);
      conditions.push(`accepts_household = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY name ASC";

    const result = await pool.query(query, values);
    return result.rows;
  },

  // Get center by ID
  getById: async (id) => {
    const query = "SELECT * FROM centers WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update center
  update: async (id, centerData) => {
    const fields = Object.keys(centerData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = Object.values(centerData);
    const query = `
      UPDATE centers 
      SET ${fields}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  },

  // Delete center
  delete: async (id) => {
    const query = "DELETE FROM centers WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
