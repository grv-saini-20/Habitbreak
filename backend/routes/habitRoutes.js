import express from "express";
import { createHabit, getAllHabits } from "../controllers/habitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createHabit);
router.get("/", protect, getAllHabits);

export default router;