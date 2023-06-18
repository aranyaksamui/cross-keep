// Import dependencies
import { Router } from "express";
import { createNote, deleteNote, favNote, getCreatePage, getEditNotePage, updateNote } from "../controllers/notes_controller.js";

// Local imports

const router = Router();

// Routes
router.route("/edit/:id").get(getEditNotePage).post(updateNote);
router.post("/delete/:id", deleteNote);
router.post("/favourites/:id", favNote);
router.route("/create").get(getCreatePage).post(createNote);

export default router;
