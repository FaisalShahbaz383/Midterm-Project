import express from "express";
import Customer from "../models/Customer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 📊 DASHBOARD STATS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();

    const newCount = await Customer.countDocuments({ status: "New" });
    const contactedCount = await Customer.countDocuments({ status: "Contacted" });
    const inProgressCount = await Customer.countDocuments({ status: "In Progress" });
    const closedCount = await Customer.countDocuments({ status: "Closed" });

    res.json({
      totalCustomers,
      New: newCount,
      Contacted: contactedCount,
      "In Progress": inProgressCount,
      Closed: closedCount
    });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching dashboard data" });
  }
});

export default router;
