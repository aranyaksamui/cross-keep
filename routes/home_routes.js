// Import dependencies
import { Router } from "express";

// Local imports
import { getHome, userDashboard } from "../controllers/home_controller.js";

const router = Router();

// Routes
router.get("/", getHome);
router.get("/users/dashboard", userDashboard)

export default router;
