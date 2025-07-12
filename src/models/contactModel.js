import { pool } from "../db/index.js";

export const contactModel = {
  // Create a new contact message
  create: async (contactData) => {
    const { name, email, phone, subject, message } = contactData;

    const query = `
      INSERT INTO contacts (name, email, phone, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [name, email, phone, subject, message];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all contact messages
  getAll: async (filters = {}) => {
    let query = "SELECT * FROM contacts";
    const values = [];
    const conditions = [];

    if (filters.responded !== undefined) {
      values.push(filters.responded);
      conditions.push(`responded = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    return result.rows;
  },

  // Get contact message by ID
  getById: async (id) => {
    const query = "SELECT * FROM contacts WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update contact message (mark as responded)
  update: async (id, contactData) => {
    const fields = Object.keys(contactData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = Object.values(contactData);
    const query = `
      UPDATE contacts 
      SET ${fields}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  },

  // Delete contact message
  delete: async (id) => {
    const query = "DELETE FROM contacts WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
