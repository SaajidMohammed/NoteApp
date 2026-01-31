import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Links the note to a specific User ID
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        content: {
            type: String,
            required: [true, 'Please add some content'],
        },
        category: {
            type: String,
            default: 'General',
        },
    },
    { 
        timestamps: true // This automatically creates 'createdAt' and 'updatedAt'
    }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;