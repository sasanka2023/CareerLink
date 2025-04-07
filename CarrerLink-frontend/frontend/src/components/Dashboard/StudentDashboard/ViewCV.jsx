import React, { useEffect, useState, useRef, useContext } from 'react';
import html2pdf from 'html2pdf.js';
import { FileDown } from 'lucide-react';
import axiosInstance from '../../../api/AxiosInstance';
import { AuthContext } from "../../../api/AuthProvider";
import {getCV} from "../../../api/StudentDetailsApi";
import { useParams } from 'react-router-dom';
const ViewCV = () => {
    const { studentId } = useParams();
    const { token } = useContext(AuthContext);
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const previewRef = useRef();

    useEffect(() => {
        const fetchCV = async () => {
            try {
                // const studentId = extractStudentIdFromToken(token);
                const response = await getCV(studentId);
                console.log(response.success);
                if (response.success) {
                    setCvData(response.data);
                }
            } catch (error) {
                console.error("Error fetching CV data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (studentId) fetchCV();
    }, [studentId]);

    const extractStudentIdFromToken = (token) => {
        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            return decodedToken.userId;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    const handleDownloadPDF = () => {
        const element = previewRef.current;
        const opt = {
            margin: 0,
            filename: 'CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };
    console.log(cvData);
    if (loading) return <div>Loading CV...</div>;
    if (!cvData) return <div>No CV data found</div>;

    return (
        <div className="relative flex h-screen">
            <button
                onClick={handleDownloadPDF}
                className="absolute top-4 right-4 z-10 flex items-center justify-center px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors shadow"
            >
                <FileDown className="w-5 h-5 mr-2" />
                Export PDF
            </button>

            <div ref={previewRef} className="w-full bg-gray-50 p-8 overflow-y-auto">
                <div className="bg-white shadow-lg p-8 min-h-[700px]">
                    <h1 className="text-3xl font-bold text-blue-900">{cvData.name || 'John Doe'}</h1>
                    <p className="text-lg text-blue-600 mb-4">{cvData.title || 'Software Engineer'}</p>

                    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-6">
                        <span>{cvData.address || 'New York, NY'}</span>
                        <span>{cvData.mobile || '(123) 456-7890'}</span>
                        <span>{cvData.email || 'john.doe@example.com'}</span>
                    </div>

                    <p className="text-gray-700 mb-8">
                        {cvData.summary || 'Experienced software engineer with a passion for building innovative solutions.'}
                    </p>

                    {cvData.experiences?.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                Experience
                            </h2>
                            {cvData.experiences.map((exp, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{exp.jobTitle}</h3>
                                            <p className="text-gray-600">{exp.companyName}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                        </p>
                                    </div>
                                    <p className="text-gray-700 mt-2">{exp.description}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {cvData.educations?.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                Education
                            </h2>
                            {cvData.educations.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{edu.degree}</h3>
                                            <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                                            {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {edu.startDate} - {edu.endDate}
                                        </p>
                                    </div>
                                    {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                                </div>
                            ))}
                        </section>
                    )}

                    {cvData.skills?.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                Technical Skills
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {['frontend', 'backend', 'languages', 'tools'].map((category) => {
                                    const categorySkills = cvData.skills
                                        .filter(skill => skill.category === category)
                                        .map(skill => skill.techSkill);

                                    return categorySkills.length > 0 && (
                                        <div key={category}>
                                            <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {categorySkills.map((skill, idx) => (
                                                    <span key={idx} className="text-gray-700 px-3 py-1 rounded-full text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {cvData.projects?.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                Projects
                            </h2>
                            {cvData.projects.map((project, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{project.projectName}</h3>
                                            {project.githubLink && (
                                                <a href={project.githubLink}
                                                   className="text-blue-600 text-sm hover:underline"
                                                   target="_blank" rel="noopener noreferrer">
                                                    Project Link
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mt-2">{project.projectDescription}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {cvData.certifications?.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                Certificates
                            </h2>
                            {cvData.certifications.map((cert, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{cert.name}</h3>
                                            <p className="text-gray-600">Issued by {cert.organization}</p>
                                            {cert.certificationLink && (
                                                <a href={cert.certificationLink}
                                                   className="text-blue-600 text-sm hover:underline"
                                                   target="_blank" rel="noopener noreferrer">
                                                    View Certificate
                                                </a>
                                            )}
                                        </div>
                                        {cert.issueDate && <p className="text-sm text-gray-500">{cert.issueDate}</p>}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewCV;