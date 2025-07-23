const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Routes
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const donationRoutes = require("./routes/donateRoutes");
const communityRoutes = require('./routes/communityRoutes');
const impactRoutes = require("./routes/impactRoutes");

// Set environment mode explicitly if not set
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Allow CORS for both local dev and production frontend
app.use(cors({
  origin: [
    "http://localhost:3000",           // local development
    "https://your-frontend-domain.com" // 🔁 replace with actual deployed frontend domain or EC2 IP
  ],
  credentials: true
}));

app.use(express.json());

// Route middleware
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/donate", donationRoutes);
app.use('/api', communityRoutes);
app.use("/api/impact", impactRoutes);

// Root health check
app.get("/", (req, res) => {
  res.send("RePlate API is running 🚀");
});

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at PORT ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
