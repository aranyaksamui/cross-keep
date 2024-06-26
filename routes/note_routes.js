// Import dependencies
import { Router } from "express";

// Local imports
import { createNote, deleteNoteAndUpdateUser, favNote, getCreatePage, getUpdateNotePage, updateNote } from "../controllers/note_controller.js";

const router = Router();

// Routes
router.route("/create").get(getCreatePage).post(createNote);
router.route("/edit/:id").get(getUpdateNotePage).post(updateNote);
router.post("/delete/:id", deleteNoteAndUpdateUser);
router.post("/favourites/:id", favNote);

export default router;
