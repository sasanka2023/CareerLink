import React from 'react';
import {Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="relative">
                    {/*<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Search..."*/}
                    {/*    className="pl-10 pr-4 py-2 bg-gray-50 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"*/}
                    {/*/>*/}
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <User size={18} className="text-indigo-600" />
                        </div>
                        <span className="font-medium text-gray-700">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;