import express from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  myBusinessProfile,
  signupUser,
} from "../controllers/auth.controller.js";
import { protectAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", protectAuth, checkAuth);
router.get("/business-profile", protectAuth, myBusinessProfile);

export default router;
