import express from "express";
import { generateConceptExplanations, generateInterviewQuestions } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/generate-questions', protect, generateInterviewQuestions)
router.post('/generate-explanations', protect, generateConceptExplanations)

export default router;