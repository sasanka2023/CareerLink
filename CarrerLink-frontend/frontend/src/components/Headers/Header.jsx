import React, { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-200 rounded-lg m-1">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="flex items-center">
                        <img
                            className="h-8 w-auto"
                            src="../../Images/logo.jpg"
                            alt="CareerLink Logo"
                        />
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">CareerLink</span>
                    </div>


                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>


                    <div className="hidden sm:flex sm:items-center">
                        <div className="flex space-x-4">
                            <a
                                href="/home"
                                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                            >
                                Home
                            </a>
                            <a
                                href="/jobs"
                                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                            >
                                Jobs
                            </a>
                            <a
                                href="/employer"
                                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                            >
                                Employer
                            </a>
                            <a
                                href="/courses"
                                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                            >
                                Courses
                            </a>
                            <a
                                href="/contact"
                                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {mobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                        >
                            Team
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                        >
                            Projects
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                        >
                            Calendar
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
