import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMIddleware.js';

const router = express.Router();

// All routes here are protected
router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').delete(protect, deleteNote);

export default router;