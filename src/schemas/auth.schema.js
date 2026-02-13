import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(3, "Email is required")
    .max(255, "Email is required")
    .email("Invalid email format"),

  password: z
    .string()
     .min(8, "Password must be at least 8 characters")
});
