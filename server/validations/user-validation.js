const z = require("zod");

const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required").trim(),
  university: z.string().min(1, "University is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

const otpSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

module.exports = { registerSchema, loginSchema, otpSchema };
