import { z } from "zod";

// Donation schema
export const donationSchema = z.object({
  donor_name: z.string().min(2, "Name must be at least 2 characters"),
  donor_email: z.string().email("Invalid email address"),
  donor_phone: z.string().optional(),
  donation_type: z.enum(["clothing", "accessories", "household", "other"]),

  // donation_type: z.string().min(1, "Donation type is required"),
  items_description: z.string().min(5, "Please provide a description"),
  quantity: z.string().min(1, "Quantity is required"),
  condition: z.enum(["new", "like_new", "good", "fair", "poor"]),
  pickup_required: z.boolean().default(false),
  pickup_address: z.string().optional(),
  pickup_city: z.string().optional(),
  pickup_state: z.string().optional(),
  pickup_zip: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  center_id: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

// Center schema
export const centerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  hours: z.string().optional(),
  accepts_clothing: z.boolean().default(true),
  accepts_accessories: z.boolean().default(false),
  accepts_household: z.boolean().default(false),
});

// Volunteer schema
export const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  availability: z.string(),
  skills: z.string().optional(),
  interests: z.string(),
  previous_experience: z.string().optional(),
  preferred_center_id: z.number().int().positive().optional(),
});

// Contact schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Validation middleware
export const validate = (schema) => {
  return async (c, next) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      c.set("validated-body", body);
      await next();
    } catch (error) {
      const validationError = new Error("Validation error");
      validationError.details = error.errors;
      throw validationError;
    }
  };
};
