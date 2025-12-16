import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Leaf, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    // Simple verification check (in a real app, verify expiry)
    const isAuthenticated = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert("Logged out successfully");
        navigate('/login');
    };

    const allLinks = ['/', '/shop', '/impact', '/sell'];
    const navLinks = (isAuthenticated && role === 'buyer')
        ? allLinks.filter(link => link !== '/sell')
        : allLinks;

    const showCart = !(isAuthenticated && role === 'seller');

    return (
        <nav className="bg-[#fdfbf7] sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Leaf className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-2xl text-gray-800 tracking-wide">EcoWear</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((path) => (
                            <Link
                                key={path}
                                to={path}
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(path) ? 'text-primary font-bold' : 'text-gray-500'}`}
                            >
                                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-primary transition-colors cursor-text">
                            <Search className="h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-24 lg:w-32 outline-none placeholder-gray-400"
                            />
                        </div>
                        {showCart && (
                            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
                                <ShoppingBag className="h-6 w-6 text-gray-700" />
                                {cart.length > 0 && (
                                    <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-[#fdfbf7] flex items-center justify-center text-[10px] text-white font-bold">
                                        {cart.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100 text-red-500" title="Logout">
                                <LogOut className="h-6 w-6" />
                            </button>
                        ) : (
                            <Link to="/login" className="p-2 rounded-full hover:bg-gray-100">
                                <User className="h-6 w-6 text-gray-700" />
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-t border-gray-100"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((path) => (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(path) ? 'text-primary bg-green-50' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
