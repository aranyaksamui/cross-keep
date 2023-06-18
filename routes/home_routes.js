// Import dependencies
import { Router } from "express";

// Local imports
import { getHome } from "../controllers/home_controller.js";

const router = Router();

// Routes
router.get("/", getHome);

export default router;
