

import { useState,useContext,useEffect } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import Swal from 'sweetalert2';
import { saveTechnology, saveJobField } from '../../../api/AdminDetailsApi';
import { AuthContext } from '../../../api/AuthProvider';
import AdminList from "./AdminList";
import Course from './Course';

import TestManager from './TestManager';

import TechnologyManagement from './TechnologyManagement';
import JobFieldManagement from './JobFieldManagement';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import JobFieldStudentChart from "./JobFieldStudentChart";
import TechnologyStudentChart from "./TechnologyStudentChart";
import StudentList  from "./StudentList";


const extractRoleFromToken = (token) => {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.role;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};


const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const userRole = token ? extractRoleFromToken(token) : null;
    console.log(userRole);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [technologies, setTechnologies] = useState([]);
    const [jobFields, setJobFields] = useState([]);
    const [counts, setCounts] = useState({
        technologies: 0,
        jobFields: 0
    });
    const [chartData, setChartData] = useState({
        technologies: [],
        jobFields: []
    });
    const [cvs] = useState([
        {
            id: '1',
            candidateName: 'John Doe',
            status: 'pending',
            submittedDate: '2024-03-15'
        },
        {
            id: '2',
            candidateName: 'Jane Smith',
            status: 'pending',
            submittedDate: '2024-03-14'
        }
    ]);
    const [tests, setTests] = useState([]); // Changed to mutable empty array

    const fetchChartData = async () => {
        try {
            const techRes = await fetch('http://localhost:8091/api/admin/student-technology-counts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const jobRes = await fetch('http://localhost:8091/api/admin/student-jobfield-counts', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const techData = await techRes.json();
            const jobData = await jobRes.json();
            console.log(techData);
            setChartData({
                technologies: techData.data,
                jobFields: jobData.data
            });
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    const [newTechnology, setNewTechnology] = useState({ name: '', category: '' });
    const [newJobField, setNewJobField] = useState({ name: '', description: '' });

    useEffect(() => {
        let client = null;

        const setupWebSocket = () => {
            client = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8091/ws'),
                connectHeaders: {
                    Authorization: `Bearer ${token}`
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: (str) => console.log('STOMP:', str),
            });

            client.onConnect = () => {
                console.log('WebSocket Connected!');
                client.subscribe('/topic/counts', (message) => {
                    console.log('Raw Message:', message);
                    console.log('Message Body:', message.body);
                    try {
                        const newCounts = JSON.parse(message.body);
                        setCounts(prev => ({
                            ...prev,
                            ...newCounts
                        }));
                       console.log(message.body);
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                        console.log('Raw Body Content:', message.body);
                    }
                });
                client.subscribe('/topic/chart-updates', (message) => {
                    const newData = JSON.parse(message.body);
                    setChartData(prev => ({
                        technologies: newData.technologies || prev.technologies,
                        jobFields: newData.jobFields || prev.jobFields
                    }));
                });
            };




            client.onStompError = (frame) => {
                console.error('WebSocket error:', frame.headers.message);
            };

            client.activate();
        };

        const fetchInitialCounts = async () => {
            try {
                const response = await fetch('http://localhost:8091/api/admin/dashboard-counts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setCounts(data.data);
                console.log(data.data)
            } catch (error) {
                console.error('Error fetching initial counts:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Connection Error',
                    text: 'Failed to load dashboard data'
                });
            }
        };

        if (token) {
            fetchInitialCounts();
            fetchChartData();
            setupWebSocket();
        }

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [token]);
    const fetchCounts = async () => {
        try {
            const response = await fetch('/api/admin/dashboard-counts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setCounts(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching initial counts:', error);
        }
    };





    const handleAddTechnology = async () => {
        if (newTechnology.name && newTechnology.category) {
            const response = await saveTechnology(newTechnology);

            if (response.success) {
                setTechnologies([...technologies, {
                    ...newTechnology,
                    id: Date.now().toString()
                }]);
                setNewTechnology({ name: '', category: '' });

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: response.message,
                });
            }
        }
    };

    const handleAddJobField = async () => {
        if (newJobField.name && newJobField.description) {
            const response = await saveJobField(newJobField);

            if (response.success) {
                setJobFields([...jobFields, {
                    ...newJobField,
                    id: Date.now().toString()
                }]);
                setNewJobField({ name: '', description: '' });

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: response.message,
                });
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
            <div className="flex flex-col flex-1">
                {/* Sticky header */}
                <Header className="sticky top-0 z-10" />

                {/* Main content: scrollable only */}
                <main className="p-8 flex-1 overflow-y-auto">
                    {activeTab === 'dashboard' && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="gradient-card-1 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Total Technologies</h3>
                                    <p className="text-3xl font-bold">{counts.technologies}</p>
                                    <p className="mt-2 text-sm opacity-90">Technologies added</p>
                                </div>
                                <div className="gradient-card-2 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Job Fields</h3>
                                    <p className="text-3xl font-bold">{counts.jobFields}</p>
                                    <p className="mt-2 text-sm opacity-90">Fields available</p>
                                </div>
                                <div className="gradient-card-3 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Pending CVs</h3>
                                    <p className="text-3xl font-bold">{counts.cvs || 0}</p>
                                    <p className="mt-2 text-sm opacity-90">Awaiting review</p>
                                </div>
                                <div className="gradient-card-4 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Scheduled Tests</h3>
                                    <p className="text-3xl font-bold">{counts.tests || 0}</p>
                                    <p className="mt-2 text-sm opacity-90">Tests this week</p>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TechnologyStudentChart data={chartData.technologies} />
                                <JobFieldStudentChart data={chartData.jobFields} />
                            </div>
                        </>
                    )}

                    {activeTab === 'technologies' && <TechnologyManagement />}

                    {activeTab === 'jobs' && <JobFieldManagement />}

                    {activeTab === 'cvs' && <StudentList/>}
                    {activeTab === 'tests' && <TestManager initialTests={tests} />}
                    {activeTab === 'Courses' && <Course />}

                    {userRole === "ROLE_SUPERADMIN" && activeTab === "adminlist" && <AdminList />}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;