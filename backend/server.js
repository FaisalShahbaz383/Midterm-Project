import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import customerRoutes from "./routes/customerRoutes.js";
import dashboardRoutes from "./routes/dashboardroutes.js";


dotenv.config();

const app = express(); 

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    msg: "Protected route accessed",
    user: req.user
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("CRM Backend is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/dashboard", dashboardRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
