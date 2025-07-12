import { pool } from "../db/index.js";

export const donationModel = {
  // Create a new donation
  create: async (donationData) => {
    const {
      donor_name,
      donor_email,
      donor_phone,
      donation_type,
      items_description,
      quantity,
      condition,
      pickup_required,
      pickup_address,
      pickup_city,
      pickup_state,
      pickup_zip,
      preferred_date,
      preferred_time,
      center_id,
      notes,
    } = donationData;

    const query = `
      INSERT INTO donations (
        donor_name, donor_email, donor_phone, donation_type, items_description,
        quantity, condition, pickup_required, pickup_address, pickup_city,
        pickup_state, pickup_zip, preferred_date, preferred_time, center_id, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;

    const values = [
      donor_name,
      donor_email,
      donor_phone,
      donation_type,
      items_description,
      quantity,
      condition,
      pickup_required,
      pickup_address,
      pickup_city,
      pickup_state,
      pickup_zip,
      preferred_date,
      preferred_time,
      center_id,
      notes,
    ];

    const result = await pool.query(query, values);
    console.log(result.rows[0]);
    return result.rows[0];
  },

  // Get all donations with optional filtering
  getAll: async (filters = {}) => {
    let query = "SELECT * FROM donations";
    const values = [];
    const conditions = [];

    if (filters.status) {
      values.push(filters.status);
      conditions.push(`status = $${values.length}`);
    }

    if (filters.center_id) {
      values.push(filters.center_id);
      conditions.push(`center_id = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    return result.rows;
  },

  // Get donation by ID
  getById: async (id) => {
    const query = "SELECT * FROM donations WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update donation
  update: async (id, donationData) => {
    const fields = Object.keys(donationData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = Object.values(donationData);
    const query = `
      UPDATE donations 
      SET ${fields}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  },

  // Delete donation
  delete: async (id) => {
    const query = "DELETE FROM donations WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
