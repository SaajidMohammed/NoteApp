import NoteItem from './NoteItem';

const NoteCard = ({ notes, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default NoteCard;