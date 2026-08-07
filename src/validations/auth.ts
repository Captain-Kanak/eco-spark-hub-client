import * as z from "zod";

const nameSchema = z
  .string("Name is required")
  .trim()
  .min(2, "Name must be at least 2 characters long")
  .max(100, "Name can't be more than 100 characters long");

const emailSchema = z
  .email("Invalid email address")
  .trim()
  .max(255, "Email can't be more than 255 characters long");

const passwordSchema = z
  .string("Password is required")
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .max(50, "Password can't be more than 50 characters long");

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const updateProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const AuthValidation = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
