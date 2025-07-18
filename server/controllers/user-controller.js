const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user-model");
const {
  registerSchema,
  loginSchema,
  otpSchema,
  noteSchema,
  scheduleSchema,
} = require("../validations/user-validation");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const register = async (req, res) => {
  try {
    const { error } = registerSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { fullName, university, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = new User({
      fullName,
      university,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email - Study Management",
      text: `Your OTP for email verification is: ${otp}. It expires in 10 minutes.`,
    });

    res.status(201).json({ message: "User registered. OTP sent to email." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { error } = otpSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or email not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      fullName: req.user.fullName,
      university: req.user.university,
      email: req.user.email,
      notes: req.user.notes,
      schedule: req.user.schedule,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addNote = async (req, res) => {
  try {
    const { error } = noteSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { name, subject, driveLink } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.notes.push({ name, subject, driveLink });
    await user.save();

    res
      .status(201)
      .json({ message: "Note added successfully", notes: user.notes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const editNote = async (req, res) => {
  try {
    const { error } = noteSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { noteId } = req.params;
    const { name, subject, driveLink } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const note = user.notes.id(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.name = name;
    note.subject = subject;
    note.driveLink = driveLink;
    await user.save();

    res
      .status(200)
      .json({ message: "Note updated successfully", notes: user.notes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const note = user.notes.id(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    user.notes.pull(noteId);
    await user.save();

    res
      .status(200)
      .json({ message: "Note deleted successfully", notes: user.notes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addEvent = async (req, res) => {
  try {
    const { error } = scheduleSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { title, course, date, time, description } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.schedule.push({
      title,
      course,
      date: new Date(date),
      time,
      description,
    });
    await user.save();

    res
      .status(201)
      .json({ message: "Event added successfully", schedule: user.schedule });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const editEvent = async (req, res) => {
  try {
    const { error } = scheduleSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { eventId } = req.params;
    const { title, course, date, time, description } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const event = user.schedule.id(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = title;
    event.course = course;
    event.date = new Date(date);
    event.time = time;
    event.description = description;
    await user.save();

    res
      .status(200)
      .json({ message: "Event updated successfully", schedule: user.schedule });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const event = user.schedule.id(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    user.schedule.pull(eventId);
    await user.save();

    res
      .status(200)
      .json({ message: "Event deleted successfully", schedule: user.schedule });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  verifyOTP,
  login,
  getProfile,
  addNote,
  editNote,
  deleteNote,
  addEvent,
  editEvent,
  deleteEvent,
};
