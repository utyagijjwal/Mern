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
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/user-middleware");

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.post("/notes", authMiddleware, addNote);
router.put("/notes/:noteId", authMiddleware, editNote);
router.delete("/notes/:noteId", authMiddleware, deleteNote);

module.exports = router;
