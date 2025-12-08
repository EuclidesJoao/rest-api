import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must include an lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase")
  .regex(/[0-9]/, "Password must include a number");

export const phoneNumberSchema = z
  .string()
  .regex(/^[0-9+\-\s]{7,20}$/, "Invalidphone number");

export const CreateUserDTO = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  birthdate: z.date(),
  email: z.string().email(),
  avatar: z.string().url().optional(),
  password: passwordSchema,
  role: z.enum(["cutomer", "seller", "admin"]).default("cutomer").optional(),
});
