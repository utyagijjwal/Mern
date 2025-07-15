require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const userRoutes = require("./routes/user-route");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
     origin: ["http://localhost:3000", "https://studymastermern.vercel.app"],//https://study-management.vercel.app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", userRoutes);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
