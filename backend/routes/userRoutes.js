import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

export default router;