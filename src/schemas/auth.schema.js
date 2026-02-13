import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .regex(
      /^[A-Z]{3}-\d{3}$/,
      "Username must be in format: AAA-999 (e.g., ADM-001)"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});
