const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user-model");
const {
  registerSchema,
  loginSchema,
  otpSchema,
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
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, verifyOTP, login, getProfile };
