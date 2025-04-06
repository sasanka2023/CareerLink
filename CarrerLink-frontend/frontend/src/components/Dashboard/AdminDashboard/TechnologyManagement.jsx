import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { saveTechnology, getAllTechnologies } from '../../../api/AdminDetailsApi';

const TechnologyManagement = () => {
    const [technologies, setTechnologies] = useState([]);
    const [techName, setTechName] = useState('');

    useEffect(() => {
        loadTechnologies();
    }, []);

    const loadTechnologies = async () => {
        const response = await getAllTechnologies();
        if (response.success) {
            setTechnologies(response.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!techName.trim()) return;

        const response = await saveTechnology({ name: techName });
        if (response.success) {
            await loadTechnologies();
            setTechName('');
            Swal.fire('Success!', 'Technology added successfully', 'success');
        } else {
            Swal.fire('Error!', response.message, 'error');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Technologies</h2>

            <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter technology name"
                    className="flex-1 p-2 border rounded-xl"
                    value={techName}
                    onChange={(e) => setTechName(e.target.value)}
                />
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                    <Plus size={20} className="mr-2" /> Add Technology
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {technologies.map((tech) => (
                    <div key={tech.techId} className="p-4 border rounded-xl hover:border-indigo-500">
                        <h3 className="font-semibold">{tech.techName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechnologyManagement;