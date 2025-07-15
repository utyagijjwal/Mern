const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/user-middleware");

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.post("/notes", authMiddleware, addNote);
router.put("/notes/:noteId", authMiddleware, editNote);
router.delete("/notes/:noteId", authMiddleware, deleteNote);
router.post("/schedule", authMiddleware, addEvent);
router.put("/schedule/:eventId", authMiddleware, editEvent);
router.delete("/schedule/:eventId", authMiddleware, deleteEvent);

module.exports = router;
