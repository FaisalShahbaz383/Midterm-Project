import express from "express";
import Customer from "../models/Customer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =======================
   CREATE CUSTOMER
======================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const customer = new Customer({
      ...req.body,
      createdBy: req.user.id,
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Error creating customer" });
  }
});

/* =======================
   GET CUSTOMERS
======================= */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* =======================
   UPDATE CUSTOMER
======================= */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    // Members can update only their own customers
    if (
      req.user.role !== "admin" &&
      customer.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Access denied" });
    }

    Object.assign(customer, req.body);
    await customer.save();

    res.json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Error updating customer" });
  }
});

/* =======================
   DELETE CUSTOMER
======================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    if (
      req.user.role !== "admin" &&
      customer.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Access denied" });
    }

    await customer.deleteOne();
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting customer" });
  }
});

export default router;