import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import { getAllStudents, approveStudent } from '../../../api/StudentDetailsApi';
import { useNavigate } from 'react-router-dom';
const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudents();
                if (response.success) {
                    setStudents(response.data);
                } else {
                    Swal.fire('Error!', response.message, 'error');
                }
            } catch (error) {
                Swal.fire('Error!', 'Failed to load student list', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleApprove = async (studentId) => {
        const result = await Swal.fire({
            title: 'Approve Student?',
            text: 'Are you sure you want to approve this student?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve!'
        });

        if (result.isConfirmed) {
            try {
                const response = await approveStudent(studentId);

                if (response.success) {
                    setStudents(prev =>
                        prev.map(student =>
                            student.id === studentId
                                ? { ...student, approved: true }
                                : student
                        )
                    );
                    Swal.fire('Approved!', response.data, 'success');
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student List</h2>
            <div className="space-y-4">
                {students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-4">
                                <h3 className="font-semibold text-gray-800 text-lg">{student.firstName+student.lastName}</h3>
                                <span className={`px-2 py-1 text-sm rounded-full ${student.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {student.approved ? 'Approved' : 'Pending'}
                                </span>
                            </div>
                            <p className="text-gray-600">{student.email}</p>
                            <p className="text-gray-600 text-sm">Program: {student.degree}</p>
                        </div>
                        <Button
                            onClick={() => navigate(`/student-dashboard/viewcv/${student.studentId}`)}
                            variant="outline"
                        >
                            View CV
                        </Button>

                        {!student.approved && (
                            <button
                                onClick={() => handleApprove(student.studentId)}
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                            >
                                Approve Student
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {!loading && students.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No students found</p>
                </div>
            )}
        </div>
    );
};

export default StudentList;