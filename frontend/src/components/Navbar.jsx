import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                NoteFlow
            </Link>
            
            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block text-gray-600 font-medium">
                            Welcome, <span className="text-primary">{user.name}</span>
                        </span>
                        <button 
                            onClick={logout}
                            className="bg-gray-100 hover:bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;