import React, { useEffect, useState } from 'react';
import { AlertCircle, Loader2, X, FileText, Briefcase, Code, GraduationCap, Bookmark } from 'lucide-react';
import {getAllStudents} from "../../../api/StudentDetailsApi";

const dummyStudents = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@university.edu",
        department: "Computer Science",
        gpa: 3.85,
        university: "MIT",
        degree: "Bachelor of Science in Computer Science",
        address: "123 Tech Street, Cambridge, MA 02139",
        technologies: ["React", "Node.js", "Python", "AWS", "Docker"],
        jobFields: ["Software Development", "Cloud Computing", "DevOps"],
        results: [
            { subject: "Data Structures", grade: "A" },
            { subject: "Algorithms", grade: "A+" },
            { subject: "Web Development", grade: "A" }
        ],
        appliedJobs: [
            {
                company: "Google",
                position: "Software Engineer",
                status: "Interview",
                appliedDate: "2024-02-15"
            },
            {
                company: "Amazon",
                position: "Full Stack Developer",
                status: "Applied",
                appliedDate: "2024-02-20"
            }
        ],
        cv: "https://example.com/cv/john-smith",
        enrolledTests: [
            {
                testName: "AWS Certification",
                date: "2024-01-15",
                score: 85,
                maxScore: 100
            },
            {
                testName: "JavaScript Assessment",
                date: "2024-02-01",
                score: 92,
                maxScore: 100
            }
        ],
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
    },
    // Add more dummy students here with different images
];

export default function StudentTab() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        getAllStudents()
            .then(response => {
                setStudents(response.data);

                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load student data.");
                setLoading(false);
            });
    }, []);

    console.log(selectedStudent);
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading students...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-red-50 text-red-600 rounded-lg p-4">
                <AlertCircle className="w-6 h-6 mr-2" />
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student List</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                        <tr
                            key={student.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedStudent(student)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={student.profileImageUrl}
                                            alt={student.name}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                        <div className="text-sm text-gray-500">ID: {student.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{student.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{student.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{student.gpa !== undefined && student.gpa !== null ? student.gpa.toFixed(2) : "N/A"
                                }</div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Student Details Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <img
                                        src={selectedStudent.image}
                                        alt={selectedStudent.name}
                                        className="h-16 w-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h3>
                                        <p className="text-gray-600">{selectedStudent.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                                            <GraduationCap className="w-5 h-5 mr-2" />
                                            Education
                                        </h4>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">University:</span> {selectedStudent.university}</p>
                                            <p><span className="font-medium">Degree:</span> {selectedStudent.degree}</p>
                                            <p><span className="font-medium">Department:</span> {selectedStudent.department}</p>
                                            <p><span className="font-medium">GPA:</span> {typeof selectedStudent.gpa === "number" ? selectedStudent.gpa.toFixed(2) : "N/A"
                                            }</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                                            <Code className="w-5 h-5 mr-2" />
                                            Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedStudent.technologies?.map((tech) => (
                                                <span key={tech.techId} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
        {tech.techName}
    </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                                            <Bookmark className="w-5 h-5 mr-2" />
                                            Job Fields
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedStudent.jobFields?.map((field) => (
                                                <span key={field.jobFieldId} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
        {field.jobField}
    </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                {/*<div className="space-y-4">*/}
                                {/*    <div className="bg-gray-50 p-4 rounded-lg">*/}
                                {/*        <h4 className="text-lg font-semibold mb-3 flex items-center">*/}
                                {/*            <Briefcase className="w-5 h-5 mr-2" />*/}
                                {/*            Applied Jobs*/}
                                {/*        </h4>*/}
                                {/*        <div className="space-y-3">*/}
                                {/*            {selectedStudent.appliedJobs.map((job, index) => (*/}
                                {/*                <div key={index} className="border-b pb-2 last:border-0 last:pb-0">*/}
                                {/*                    <p className="font-medium">{job.company} - {job.position}</p>*/}
                                {/*                    <p className="text-sm text-gray-600">Status: {job.status}</p>*/}
                                {/*                    <p className="text-sm text-gray-600">Applied: {job.appliedDate}</p>*/}
                                {/*                </div>*/}
                                {/*            ))}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*    <div className="bg-gray-50 p-4 rounded-lg">*/}
                                {/*        <h4 className="text-lg font-semibold mb-3 flex items-center">*/}
                                {/*            <FileText className="w-5 h-5 mr-2" />*/}
                                {/*            Test Results*/}
                                {/*        </h4>*/}
                                {/*        <div className="space-y-3">*/}
                                {/*            {selectedStudent.enrolledTests.map((test, index) => (*/}
                                {/*                <div key={index} className="border-b pb-2 last:border-0 last:pb-0">*/}
                                {/*                    <p className="font-medium">{test.testName}</p>*/}
                                {/*                    <p className="text-sm text-gray-600">Date: {test.date}</p>*/}
                                {/*                    <p className="text-sm text-gray-600">Score: {test.score}/{test.maxScore}</p>*/}
                                {/*                </div>*/}
                                {/*            ))}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
