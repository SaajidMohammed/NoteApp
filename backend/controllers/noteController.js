import Note from '../models/Note.js';

// @desc    Get all notes for logged in user
// @route   GET /api/notes
export const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
};

// @desc    Create a note
// @route   POST /api/notes
export const createNote = async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    const note = new Note({
        user: req.user._id,
        title,
        content,
        category,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        await note.deleteOne();
        res.json({ message: 'Note removed' });
    } else {
        res.status(404).json({ message: 'Note not found or unauthorized' });
    }
};