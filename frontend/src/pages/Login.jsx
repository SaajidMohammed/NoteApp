import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8">Please enter your details to sign in</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-indigo-700 text-white font-semibold p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-100"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account? {' '}
                    <Link to="/register" className="text-primary font-bold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;