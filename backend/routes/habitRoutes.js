import express from "express";
import { createHabit } from "../controllers/habitController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", protect, createHabit);

export default router;