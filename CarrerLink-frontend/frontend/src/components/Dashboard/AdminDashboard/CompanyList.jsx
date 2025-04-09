import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAllCompanies, approveCompany } from '../../../api/CompanyDetailsApi';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getAllCompanies();
                if (response.success) {
                    setCompanies(response.data);
                } else {
                    Swal.fire('Error!', response.message, 'error');
                }
            } catch (error) {
                Swal.fire('Error!', 'Failed to load companies', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    const handleApprove = async (companyId) => {
        const result = await Swal.fire({
            title: 'Approve Company?',
            text: 'Are you sure you want to approve this company?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve!'
        });

        if (result.isConfirmed) {
            try {
                const response = await approveCompany(companyId);

                if (response.success) {
                    setCompanies(prev =>
                        prev.map(company =>
                            company.id === companyId ? { ...company, approved: true } : company
                        )
                    );
                    Swal.fire('Approved!', response.data, 'success');
                } else {
                    Swal.fire('Error!', response.message, 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || 'Approval failed', 'error');
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Company List</h2>
            <div className="space-y-4">
                {companies.map(company => (
                    <div key={company.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-4">
                                <h3 className="font-semibold text-gray-800 text-lg">{company.name}</h3>
                                <span className={`px-2 py-1 text-sm rounded-full ${company.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {company.approved ? 'Approved' : 'Pending'}
                                </span>
                            </div>
                            <p className="text-gray-600">{company.email}</p>
                            <p className="text-gray-600 text-sm">Location: {company.location}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {!company.approved ? (
                                <button
                                    onClick={() => handleApprove(company.id)}
                                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Approve Company
                                </button>
                            ) : (
                                <span className="text-green-600 font-medium">Approved</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {!loading && companies.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No companies found</p>
                </div>
            )}
        </div>
    );
};

export default CompanyList;