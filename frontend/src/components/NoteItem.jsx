import { format } from 'date-fns'; // Recommended: npm install date-fns

const NoteItem = ({ note, onDelete }) => {
    return (
        <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
            {/* Category Tag */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-indigo-50 px-2 py-1 rounded-md mb-4 inline-block">
                {note.category}
            </span>

            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{note.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                {note.content}
            </p>

            <div className="flex justify-between items-center mt-auto border-t border-gray-50 pt-4">
                <span className="text-[11px] text-gray-400 font-medium">
                    {format(new Date(note.createdAt), 'MMM dd, yyyy • p')}
                </span>
                
                <button 
                    onClick={() => onDelete(note._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Note"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NoteItem;