import { z } from "zod";

export const orderSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .regex(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number."),
  address: z.string().min(1, "Delivery address is required."),
  city: z.string().min(1, "City is required."),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cash", "card", "mobile"]),
  items: z
    .array(z.object({ id: z.string(), qty: z.number().int().positive() }))
    .min(1, "Your cart is empty."),
});
