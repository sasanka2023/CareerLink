import React, {useContext} from 'react';
import {
    LayoutDashboard,
    Briefcase,
    Cpu,
    FileCheck,
    Calendar,
    LogOut,
    ChevronRight,
    FilePen,
    ContactRound,
} from 'lucide-react';
import { AuthContext } from "../../../api/AuthProvider";
import {useNavigate} from "react-router-dom";

import { Building } from 'lucide-react';
const Sidebar = ({ activeTab, setActiveTab, userRole }) => {


    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-indigo-600 mb-8">CareerLink</h1>
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'dashboard'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <LayoutDashboard size={20} className="mr-3"/>
                        <span className="font-medium">Dashboard</span>
                        {activeTab === 'dashboard' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'students'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <ContactRound size={20} className="mr-3"/>
                        <span className="font-medium">Students</span>
                        {activeTab === 'students' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('technologies')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'technologies'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <Cpu size={20} className="mr-3"/>
                        <span className="font-medium">Technologies</span>
                        {activeTab === 'technologies' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('Courses')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'Courses'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <FilePen size={20} className="mr-3"/>
                        <span className="font-medium">Courses</span>
                        {activeTab === 'Courses' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'jobs'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <Briefcase size={20} className="mr-3"/>
                        <span className="font-medium">Job Fields</span>
                        {activeTab === 'jobs' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('cvs')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'cvs'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <FileCheck size={20} className="mr-3"/>
                        <span className="font-medium">CV Approval</span>
                        {activeTab === 'cvs' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('tests')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'tests'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <Calendar size={20} className="mr-3"/>
                        <span className="font-medium">Test Schedule</span>
                        {activeTab === 'tests' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('companies')}
                        className={`flex items-center w-full p-3 rounded-xl transition-all ${
                            activeTab === 'companies'
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <Building size={20} className="mr-3"/>
                        <span className="font-medium">Companies</span>
                        {activeTab === 'companies' && <ChevronRight className="ml-auto" size={18}/>}
                    </button>
                    {userRole === "ROLE_SUPERADMIN" && (<button
                            onClick={() => setActiveTab('adminlist')}
                            className={`flex items-center w-full p-3 rounded-xl transition-all ${
                                activeTab === 'adminlist'
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Calendar size={20} className="mr-3"/>
                            <span className="font-medium">Admin List</span>
                            {activeTab === 'adminlist' && <ChevronRight className="ml-auto" size={18}/>}
                        </button>
                    )}
                </nav>
            </div>
            <div className="absolute bottom-0 left-0 w-64 p-6 border-t border-gray-200">
                {/*<button className="flex items-center w-full p-3 text-gray-600 hover:bg-gray-50 rounded-xl">*/}
                {/*    <Settings size={20} className="mr-3" />*/}
                {/*    <span className="font-medium">Settings</span>*/}
                {/*</button>*/}
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                    <LogOut size={20} className="mr-3"/>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;