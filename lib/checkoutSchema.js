import { z } from "zod";

// 1. Ensure you use z.object(...)
// 2. Ensure it is explicitly exported
const checkoutSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
});

export default checkoutSchema;