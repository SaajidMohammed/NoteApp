import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/Login';
import Register from './pages/register';
import Dashboard from './pages/Dashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
    const { user, loading } = useContext(AuthContext);

    // Show a global spinner while the AuthContext checks for an existing session
    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 selection:bg-indigo-100 selection:text-primary">
            {/* Global Notifications */}
            <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: '12px',
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />

            <Navbar />

            <main className="flex-grow">
                <Routes>
                    {/* Public Routes: Redirect to dashboard if already logged in */}
                    <Route 
                        path="/login" 
                        element={!user ? <Login /> : <Navigate to="/dashboard" />} 
                    />
                    <Route 
                        path="/register" 
                        element={!user ? <Register /> : <Navigate to="/dashboard" />} 
                    />

                    {/* Private Route: Redirect to login if not authenticated */}
                    <Route 
                        path="/dashboard" 
                        element={user ? <Dashboard /> : <Navigate to="/login" />} 
                    />

                    {/* Root Redirection */}
                    <Route 
                        path="/" 
                        element={<Navigate to={user ? "/dashboard" : "/login"} />} 
                    />

                    {/* 404 Catch-all */}
                    <Route 
                        path="*" 
                        element={<Navigate to="/" />} 
                    />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;