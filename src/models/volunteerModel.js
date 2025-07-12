import { pool } from "../db/index.js";

export const volunteerModel = {
  // Create a new volunteer
  create: async (volunteerData) => {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      availability,
      skills,
      interests,
      previous_experience,
      preferred_center_id,
    } = volunteerData;

    const query = `
      INSERT INTO volunteers (
        name, email, phone, address, city, state, zip,
        availability, skills, interests, previous_experience, preferred_center_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      availability,
      skills,
      interests,
      previous_experience,
      preferred_center_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all volunteers with optional filtering
  getAll: async (filters = {}) => {
    let query = "SELECT * FROM volunteers";
    const values = [];
    const conditions = [];

    if (filters.status) {
      values.push(filters.status);
      conditions.push(`status = $${values.length}`);
    }

    if (filters.preferred_center_id) {
      values.push(filters.preferred_center_id);
      conditions.push(`preferred_center_id = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    return result.rows;
  },

  // Get volunteer by ID
  getById: async (id) => {
    const query = "SELECT * FROM volunteers WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update volunteer
  update: async (id, volunteerData) => {
    const fields = Object.keys(volunteerData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = Object.values(volunteerData);
    const query = `
      UPDATE volunteers 
      SET ${fields}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  },

  // Delete volunteer
  delete: async (id) => {
    const query = "DELETE FROM volunteers WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
