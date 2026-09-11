import express from "express";
import { protectAuth } from "../middlewares/auth.middleware.js";
import {
  completeBusinessOnboarding,
  completeProfileOnboarding,
} from "../controllers/onboarding.controller.js";

const router = express.Router();

router.use(protectAuth);

router.post("/profile/complete", completeProfileOnboarding);
router.post("/business/complete", completeBusinessOnboarding);

export default router;
