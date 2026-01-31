import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchNotes, createNote, deleteNote } from '../api';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // State for search

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  // 1. Fetch Notes
  const getNotesData = async () => {
    try {
      const { data } = await fetchNotes();
      setNotes(data);
    } catch (error) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotesData();
  }, []);

  // 2. Handle Create Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return toast.error("Please fill in all fields");

    try {
      const { data } = await createNote({ title, content, category });
      setNotes([data, ...notes]);
      setTitle('');
      setContent('');
      toast.success("Note added!");
    } catch (error) {
      toast.error("Error creating note");
    }
  };

  // 3. Handle Delete
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Could not delete note");
    }
  };

  // 4. Enhanced Filter Logic (Category + Search)
  const filteredNotes = notes.filter(note => {
    const matchesCategory = activeCategory === 'All' || note.category === activeCategory;
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex pt-20 bg-gray-50 min-h-screen">
      {/* Sidebar Component - Passing notes for automatic count calculation */}
      <Sidebar 
        setCategory={setActiveCategory} 
        activeCategory={activeCategory} 
        notes={notes} 
      />

      <div className="flex-1 p-6 md:p-10">
        
        {/* Search Bar & Add Note Section */}
        <div className="max-w-3xl mx-auto mb-12 space-y-6">
          
          {/* Modern Search Input */}
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text"
              placeholder="Search your notes..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <input
              type="text"
              placeholder="Note Title"
              className="w-full text-xl font-bold outline-none placeholder:text-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write your thoughts..."
              className="w-full outline-none text-gray-600 resize-none min-h-[100px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <select
                className="bg-gray-50 text-gray-500 text-sm p-2 rounded-lg outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Ideas">Ideas</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button className="bg-primary text-white px-8 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-100 active:scale-95 transition-all cursor-pointer">
                Save Note
              </button>
            </div>
          </form>
        </div>

        {/* Notes Header with Result Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeCategory} Notes
            {searchQuery && <span className="text-gray-400 font-normal text-lg ml-2">matching "{searchQuery}"</span>}
          </h2>
          <span className="text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            {filteredNotes.length} results
          </span>
        </div>

        {/* Notes Grid Display */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredNotes.length > 0 ? (
          <NoteCard notes={filteredNotes} onDelete={handleDeleteNote} />
        ) : (
          <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">No notes match your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="text-primary text-sm font-bold mt-2 hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;