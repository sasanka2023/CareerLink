import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Now safe to use since it's inside <BrowserRouter>

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/jobs', label: 'Jobs' },
        { path: '/employers', label: 'Employers' },
        { path: '/courses', label: 'Courses' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-blue-600">CareerLink</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                        isActive(link.path)
                                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                                            : 'text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`block pl-3 pr-4 py-2 text-base font-medium ${
                                isActive(link.path)
                                    ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

            </div>
        </nav>
    );
}

export default Header;