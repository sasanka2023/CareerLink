import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    BookOpen,
    Briefcase,
    FileText,
    FileSpreadsheet,
    Bell,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { AuthContext } from "../../../api/AuthProvider";


function StudentDashboardLayout({ children,StudentName,profileImage }) {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSubItem, setSelectedSubItem] = useState(null);

    const navigationItems = [
        { path: "/student", icon: Home, label: "Home" },
        { path: "/student-dashboard/courses", icon: BookOpen, label: "Courses" },
        { path: "/student-dashboard/jobs", icon: Briefcase, label: "Jobs" },
        {
            path: "",
            icon: FileText,
            label: "Tests",
            isDropdown: true,
            subItems: [
                { path: "/testplatform", label: "Exams" },
                { path: "/testplatform/view-marks", label: "View Marks" },
                { path: "/testplatform/check-answers", label: "Check Answers" },
            ],
        },
        { path: "/student-dashboard/cv", icon: FileSpreadsheet, label: "CV" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/home");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Fixed Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 fixed h-full">
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-200">
                        <Link to="/student" className="flex items-center space-x-2">
              <span className="text-xl text-indigo-600 font-bold">
                CareerLink
              </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navigationItems.map((item) =>
                            item.isDropdown ? (
                                <div key={item.label}>
                                    <button
                                        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 ${
                                            isDropdownOpen ? "bg-indigo-50 text-indigo-600" : ""
                                        }`}
                                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </div>
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform ${
                                                isDropdownOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="ml-6 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.path}
                                                    to={subItem.path}
                                                    className={`block px-4 py-2.5 rounded-lg transition-colors ${
                                                        isActive(subItem.path) || selectedSubItem === subItem.path
                                                            ? "bg-indigo-50 text-indigo-600"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                    }`}
                                                    onClick={() => setSelectedSubItem(subItem.path)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                                        isActive(item.path)
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        )}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-gray-200 space-y-1">
                        <Link
                            to="/student-dashboard/settings"
                            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                                isActive("/student-dashboard/settings")
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </Link>
                        <button
                            className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable Main Content */}
            <div className="flex-1 ml-64">
                {/* Fixed Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Student Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                        <Link
                            to="/editprofile"
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium">{StudentName}</span>
                        </Link>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <main className="p-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - 4rem)" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default StudentDashboardLayout;
