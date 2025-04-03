import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAdminList, approveAdmin } from '../../../api/AdminDetailsApi';

const AdminList = () => {
    const [adminList, setAdminList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await getAdminList();
                if (response.success) {
                    setAdminList(response.data);
                } else {
                    Swal.fire('Error!', response.message, 'error');
                }
            } catch (error) {
                console.error('Error fetching admin list:', error);
                Swal.fire('Error!', 'Failed to load admin list', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const handleApprove = async (adminId) => {
        const result = await Swal.fire({
            title: 'Approve Admin?',
            text: 'Are you sure you want to approve this admin?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve!'
        });

        if (result.isConfirmed) {
            try {
                const adminToUpdate = adminList.find(admin => admin.id === adminId);
                if (!adminToUpdate) throw new Error('Admin not found');

                // Create updated admin data with status = true
                const updatedAdmin = {
                    ...adminToUpdate,
                    status: true
                };

                const response = await approveAdmin(adminId, updatedAdmin);

                if (response.success) {
                    // Update local state
                    setAdminList(prev =>
                        prev.map(admin =>
                            admin.id === adminId ? updatedAdmin : admin
                        )
                    );
                    Swal.fire('Approved!', 'Admin has been approved.', 'success');
                } else {
                    Swal.fire('Error!', response.message, 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin List</h2>
            <div className="space-y-4">
                {adminList.map(admin => (
                    <div key={admin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-4">
                                <h3 className="font-semibold text-gray-800 text-lg">{admin.fullName}</h3>
                                <span className={`px-2 py-1 text-sm rounded-full ${admin.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {admin.status ? 'Approved' : 'Pending'}
                                </span>
                            </div>
                            <p className="text-gray-600">{admin.email}</p>
                            <p className="text-gray-600 text-sm">Profession: {admin.profession}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {!admin.status ? (
                                <button
                                    onClick={() => handleApprove(admin.id)}
                                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Approve Admin
                                </button>
                            ) : (
                                <span className="text-green-600 font-medium">Approved</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {!loading && adminList.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No admins found</p>
                </div>
            )}
        </div>
    );
};

export default AdminList;