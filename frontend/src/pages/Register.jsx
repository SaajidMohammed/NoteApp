import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-8">Start organizing your thoughts today</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                            placeholder="John Doe"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                            placeholder="john@example.com"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-indigo-700 text-white font-semibold p-3 rounded-xl transition-all active:scale-95"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account? {' '}
                    <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;