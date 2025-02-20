import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './Sidebar'; // Import Sidebar component
import Header from './Header'; // Import Header component

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [technologies, setTechnologies] = useState([]);
    const [jobFields, setJobFields] = useState([]);
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
    const [tests] = useState([
        {
            id: '1',
            candidateName: 'John Doe',
            technology: 'React',
            date: '2024-03-20',
            time: '10:00'
        }
    ]);

    const [newTechnology, setNewTechnology] = useState({ name: '', category: '' });
    const [newJobField, setNewJobField] = useState({ name: '', description: '' });

    const handleAddTechnology = () => {
        if (newTechnology.name && newTechnology.category) {
            setTechnologies([...technologies, { ...newTechnology, id: Date.now().toString() }]);
            setNewTechnology({ name: '', category: '' });
        }
    };

    const handleAddJobField = () => {
        if (newJobField.name && newJobField.description) {
            setJobFields([...jobFields, { ...newJobField, id: Date.now().toString() }]);
            setNewJobField({ name: '', description: '' });
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-8">
                    {activeTab === 'dashboard' && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="gradient-card-1 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Total Technologies</h3>
                                    <p className="text-3xl font-bold">{technologies.length}</p>
                                    <p className="mt-2 text-sm opacity-90">Technologies added</p>
                                </div>
                                <div className="gradient-card-2 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Job Fields</h3>
                                    <p className="text-3xl font-bold">{jobFields.length}</p>
                                    <p className="mt-2 text-sm opacity-90">Fields available</p>
                                </div>
                                <div className="gradient-card-3 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Pending CVs</h3>
                                    <p className="text-3xl font-bold">{cvs.filter(cv => cv.status === 'pending').length}</p>
                                    <p className="mt-2 text-sm opacity-90">Awaiting review</p>
                                </div>
                                <div className="gradient-card-4 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Scheduled Tests</h3>
                                    <p className="text-3xl font-bold">{tests.length}</p>
                                    <p className="mt-2 text-sm opacity-90">Tests this week</p>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'technologies' && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Technologies</h2>
                            <button
                                onClick={handleAddTechnology}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                            >
                                <Plus size={20} className="mr-2" /> Add Technology
                            </button>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {technologies.map(tech => (
                                    <div key={tech.id} className="p-4 border border-gray-200 rounded-xl hover:border-indigo-500">
                                        <h3 className="font-semibold text-gray-800">{tech.name}</h3>
                                        <p className="text-gray-600 mt-1">{tech.category}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'jobs' && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Job Fields</h2>
                            <button
                                onClick={handleAddJobField}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                            >
                                <Plus size={20} className="mr-2" /> Add Job Field
                            </button>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {jobFields.map(field => (
                                    <div key={field.id} className="p-4 border border-gray-200 rounded-xl hover:border-indigo-500">
                                        <h3 className="font-semibold text-gray-800">{field.name}</h3>
                                        <p className="text-gray-600 mt-1">{field.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
