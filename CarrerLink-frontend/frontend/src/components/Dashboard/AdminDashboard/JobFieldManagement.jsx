import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { saveJobField, getAllJobFields } from '../../../api/AdminDetailsApi';

const JobFieldManagement = () => {
    const [jobFields, setJobFields] = useState([]);
    const [fieldName, setFieldName] = useState('');

    useEffect(() => {
        loadJobFields();
    }, []);

    const loadJobFields = async () => {
        const response = await getAllJobFields();
        if (response.success) {
            setJobFields(response.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fieldName.trim()) return;

        const response = await saveJobField({ name: fieldName });
        if (response.success) {
            await loadJobFields();
            setFieldName('');
            Swal.fire('Success!', 'Job field added successfully', 'success');
        } else {
            Swal.fire('Error!', response.message, 'error');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Job Fields</h2>

            <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter job field name"
                    className="flex-1 p-2 border rounded-xl"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                    <Plus size={20} className="mr-2" /> Add Job Field
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobFields.map((field) => (
                    <div key={field.jobFieldId} className="p-4 border rounded-xl hover:border-indigo-500">
                        <h3 className="font-semibold">{field.jobField}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobFieldManagement;