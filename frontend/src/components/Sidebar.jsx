const Sidebar = ({ setCategory, activeCategory, notes = [] }) => {
    // List of categories to display
    const categories = ['All', 'Work', 'Personal', 'Ideas', 'Urgent'];

    // Helper function to get count for a specific category
    const getCount = (cat) => {
        if (cat === 'All') return notes.length;
        return notes.filter(note => note.category === cat).length;
    };

    return (
        <aside className="w-64 hidden lg:flex flex-col gap-2 p-6 border-r border-gray-100 h-[calc(100vh-80px)] sticky top-20">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Categories
            </h3>
            
            <div className="flex flex-col gap-1">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    const count = getCount(cat);

                    return (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`group flex justify-between items-center px-4 py-3 rounded-xl transition-all font-medium cursor-pointer ${
                                isActive 
                                ? 'bg-primary text-white shadow-md shadow-indigo-100' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <span>{cat}</span>
                            
                            {/* Count Badge */}
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold transition-all ${
                                isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                            }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;