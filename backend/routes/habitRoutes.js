import express from "express";
import { createHabit, getAllHabits, updateHabit, deleteHabit, completeHabit } from "../controllers/habitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createHabit);
router.get("/", protect, getAllHabits);
router.patch("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);
router.post("/:id/complete", protect, completeHabit);

export default router;