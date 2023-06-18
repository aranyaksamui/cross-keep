// Import dependencies
import { Router } from "express";

// Local imports
import { userDashboard, userLogin, userLogout, userRegister } from "../controllers/user_controller.js";

const router = Router();

// Routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/dashboard", userDashboard)

export default router;
