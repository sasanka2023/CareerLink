import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 rounded-lg shadow dark:bg-gray-900 mt-8">
            <div className="w-full max-w-screen-xl mx-auto px-6 py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="text-2xl font-semibold text-gray-800 dark:text-white">CareerLink</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6">Home</a>
                        </li>
                        <li>
                            <a href="/jobs" className="hover:underline me-4 md:me-6">Jobs</a>
                        </li>
                        <li>
                            <a href="/employer" className="hover:underline me-4 md:me-6">Employer</a>
                        </li>
                        <li>
                            <a href="/courses" className="hover:underline me-4 md:me-6">Courses</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />
                <div className="text-center">
                    <span className="block text-sm text-gray-600 dark:text-gray-400">
                        © 2023 <a href="/" className="hover:underline">CareerLink™</a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
