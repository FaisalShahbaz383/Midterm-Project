import express from "express";
import Customer from "../models/Customer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 CREATE CUSTOMER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const customer = new Customer({
      ...req.body,
      createdBy: req.user.id // 👈 IMPORTANT
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Error creating customer" });
  }
});

// 🔹 GET CUSTOMERS (admin → all, member → own)
router.get("/", authMiddleware, async (req, res) => {
  try {
    let customers;

    if (req.user.role === "admin") {
      customers = await Customer.find()
        .populate("assignedTo", "name email");
    } else {
      customers = await Customer.find({ createdBy: req.user.id })
        .populate("assignedTo", "name email");
    }

    res.json(customers);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching customers" });
  }
});

// 🔹 UPDATE CUSTOMER
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Error updating customer" });
  }
});

// 🔹 DELETE CUSTOMER
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting customer" });
  }
});

export default router;
