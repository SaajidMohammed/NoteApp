import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser as loginService, registerUser as registerService } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Check for existing session on app load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    // 2. Login Logic
    const login = async (credentials) => {
        try {
            const { data } = await loginService(credentials);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success(`Welcome back, ${data.name}!`);
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || "Invalid credentials";
            toast.error(message);
            throw error; // Pass error back to component if needed
        }
    };

    // 3. Register Logic
    const register = async (userData) => {
        try {
            const { data } = await registerService(userData);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success("Account created successfully!");
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
            throw error;
        }
    };

    // 4. Logout Logic
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        toast.success("Logged out successfully");
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};