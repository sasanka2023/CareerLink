import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CvFormatsModal from "../studentDashboard/CvFormatModel";
import {
  Dashboard,
  School,
  Work,
  ListAlt,
  Description,
  Settings,
  Logout,
  Menu,
} from "@mui/icons-material";
import { AuthContext } from "../../api/AuthProvider";

const menuItems = [
  { icon: <Dashboard />, label: "Dashboard", href: "/" },
  { icon: <School />, label: "Courses", href: "/courses" },
  { icon: <Work />, label: "Jobs", href: "/jobs" },
  { icon: <ListAlt />, label: "Tests", href: "/tests" },
  { icon: <Description />, label: "CV", href: "/view-cv" },
  { icon: <Settings />, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleCvClick = (e) => {
    e.preventDefault();
    setIsCvModalOpen(true);
  };

  return (
    <div
      className={`flex flex-col h-full bg-gray-900 text-white transition-all ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between h-16 bg-gray-800 px-4">
        {!isCollapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-gray-700"
        >
          <Menu />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <Link
            to={item.href}
            key={item.href}
            onClick={item.label === "CV" ? handleCvClick : null}
            className={`flex items-center px-4 py-2 rounded hover:bg-gray-800 ${
              location.pathname === item.href ? "bg-gray-800" : ""
            } ${isCollapsed ? "justify-center" : "justify-start"}`}
          >
            {item.icon}
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <CvFormatsModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      <div className="p-4">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-800 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Logout />
          {!isCollapsed && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
}
