import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/admin/test", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin! You can manage products."
  });
});

export default router;