const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    university: {
      type: String,
      required: [true, "University is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    notes: [
      {
        name: {
          type: String,
          required: [true, "Note name is required"],
          trim: true,
        },
        subject: {
          type: String,
          required: [true, "Subject is required"],
          trim: true,
        },
        driveLink: {
          type: String,
          required: [true, "Drive link is required"],
          trim: true,
          match: [
            /^https:\/\/drive\.google\.com\/.*/,
            "Please enter a valid Google Drive link",
          ],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    schedule: [
      {
        title: {
          type: String,
          required: [true, "Event title is required"],
          trim: true,
        },
        course: {
          type: String,
          required: [true, "Course is required"],
          trim: true,
        },
        date: {
          type: Date,
          required: [true, "Date is required"],
        },
        time: {
          type: String,
          required: [true, "Time is required"],
          trim: true,
        },
        description: {
          type: String,
          trim: true,
          default: "",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
