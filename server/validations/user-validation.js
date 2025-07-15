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

const noteSchema = z.object({
  name: z.string().min(1, "Note name is required").trim(),
  subject: z.string().min(1, "Subject is required").trim(),
  driveLink: z
    .string()
    .url("Invalid URL")
    .regex(
      /^https:\/\/drive\.google\.com\/.*/,
      "Please enter a valid Google Drive link"
    ),
});

const scheduleSchema = z.object({
  title: z.string().min(1, "Event title is required").trim(),
  course: z.string().min(1, "Course is required").trim(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  description: z.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  otpSchema,
  noteSchema,
  scheduleSchema,
};
