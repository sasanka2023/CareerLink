import React, { useState, useRef } from 'react';
import DashboardLayout from '../StudentDashboard/StudentDashboardLayout';
import html2pdf from 'html2pdf.js';

const CV2 = () => {
    const [formData, setFormData] = useState({
        personalDetails: {
            name: '',
            emailAddress: '',
            phoneNumber: '',
            address: '',
            driversLicense: '',
            linkedin: ''
        },
        profile: '',
        employment: [{
            startDate: '',
            endDate: '',
            position: '',
            company: '',
            location: '',
            responsibilities: ['']
        }]
    });

    const cvPreviewRef = useRef(null);

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleEmploymentChange = (index, field, value) => {
        setFormData(prev => {
            const newEmployment = [...prev.employment];
            newEmployment[index] = {
                ...newEmployment[index],
                [field]: value
            };
            return {
                ...prev,
                employment: newEmployment
            };
        });
    };

    const addEmployment = () => {
        setFormData(prev => ({
            ...prev,
            employment: [
                ...prev.employment,
                {
                    startDate: '',
                    endDate: '',
                    position: '',
                    company: '',
                    location: '',
                    responsibilities: ['']
                }
            ]
        }));
    };

    const addResponsibility = (employmentIndex) => {
        setFormData(prev => {
            const newEmployment = [...prev.employment];
            newEmployment[employmentIndex].responsibilities.push('');
            return {
                ...prev,
                employment: newEmployment
            };
        });
    };

    const handleResponsibilityChange = (employmentIndex, responsibilityIndex, value) => {
        setFormData(prev => {
            const newEmployment = [...prev.employment];
            newEmployment[employmentIndex].responsibilities[responsibilityIndex] = value;
            return {
                ...prev,
                employment: newEmployment
            };
        });
    };

    const handlePreview = () => {
        if (cvPreviewRef.current) {
            cvPreviewRef.current.style.display = 'block';
        }
    };

    const handleGenerateCV = () => {
        if (cvPreviewRef.current) {
            const element = cvPreviewRef.current;
            const opt = {
                margin: 10,
                filename: `${formData.personalDetails.name || 'Resume'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save();
        }
    };

    const CVPreview = () => (
        <div ref={cvPreviewRef} style={{ display: 'none', backgroundColor: '#fff', padding: '20px', marginTop: '20px', border: '1px solid #ccc', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Resume</h1>

            <h2 style={{ fontSize: '18px', marginBottom: '10px', borderBottom: '2px solid #000', paddingBottom: '5px' }}>Personal details</h2>
            <div style={{ marginLeft: '20px' }}>
                <p><strong>Name</strong> {formData.personalDetails.name || 'Full Name'}</p>
                <p><strong>Email address</strong> {formData.personalDetails.emailAddress || 'email@example.com'}</p>
                <p><strong>Phone number</strong> {formData.personalDetails.phoneNumber || '+44 123 456 7890'}</p>
                <p><strong>Address</strong> {formData.personalDetails.address || '123 Main St, City'}</p>
                <p><strong>Driver's license</strong> {formData.personalDetails.driversLicense || 'Cat. B: Full'}</p>
                <p><strong>LinkedIn</strong> <a href={formData.personalDetails.linkedin || '#'} style={{ color: '#0000EE' }}>{formData.personalDetails.linkedin || 'linkedin.com/in/your-profile'}</a></p>
            </div>

            <h2 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', borderBottom: '2px solid #000', paddingBottom: '5px' }}>Profile</h2>
            <p style={{ marginLeft: '20px' }}>{formData.profile || 'Professional summary...'}</p>

            <h2 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', borderBottom: '2px solid #000', paddingBottom: '5px' }}>Employment</h2>
            {formData.employment.map((job, index) => job.position && (
                <div key={index} style={{ marginLeft: '20px', marginBottom: '15px' }}>
                    <p><strong>{job.startDate || 'Start Date'} - {job.endDate || 'End Date'}</strong></p>
                    <p><strong>{job.position || 'Position'} - {job.company || 'Company'}, {job.location || 'Location'}</strong></p>
                    <ul style={{ listStyle: 'disc', marginLeft: '20px' }}>
                        {job.responsibilities.map((resp, respIndex) => resp && <li key={respIndex}>{resp}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    );

    return (
        <DashboardLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Professional Resume Builder</h1>

                <form className="space-y-8">
                    {/* Personal Details Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={formData.personalDetails.name}
                                    onChange={(e) => handleInputChange('personalDetails', 'name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.personalDetails.emailAddress}
                                    onChange={(e) => handleInputChange('personalDetails', 'emailAddress', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.personalDetails.phoneNumber}
                                    onChange={(e) => handleInputChange('personalDetails', 'phoneNumber', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={formData.personalDetails.address}
                                    onChange={(e) => handleInputChange('personalDetails', 'address', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Driver's License</label>
                                <input
                                    type="text"
                                    value={formData.personalDetails.driversLicense}
                                    onChange={(e) => handleInputChange('personalDetails', 'driversLicense', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                                <input
                                    type="text"
                                    value={formData.personalDetails.linkedin}
                                    onChange={(e) => handleInputChange('personalDetails', 'linkedin', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Profile</h2>
                        <textarea
                            value={formData.profile}
                            onChange={(e) => setFormData(prev => ({ ...prev, profile: e.target.value }))}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Write a brief professional summary..."
                            required
                        />
                    </div>

                    {/* Employment History Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Employment History</h2>
                        {formData.employment.map((job, jobIndex) => (
                            <div key={jobIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="text"
                                            value={job.startDate}
                                            onChange={(e) => handleEmploymentChange(jobIndex, 'startDate', e.target.value)}
                                            placeholder="e.g., Sep 2009"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="text"
                                            value={job.endDate}
                                            onChange={(e) => handleEmploymentChange(jobIndex, 'endDate', e.target.value)}
                                            placeholder="e.g., Jun 2010"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Position</label>
                                        <input
                                            type="text"
                                            value={job.position}
                                            onChange={(e) => handleEmploymentChange(jobIndex, 'position', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Company</label>
                                        <input
                                            type="text"
                                            value={job.company}
                                            onChange={(e) => handleEmploymentChange(jobIndex, 'company', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            value={job.location}
                                            onChange={(e) => handleEmploymentChange(jobIndex, 'location', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                                    {job.responsibilities.map((responsibility, respIndex) => (
                                        <div key={respIndex} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={responsibility}
                                                onChange={(e) => handleResponsibilityChange(jobIndex, respIndex, e.target.value)}
                                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                placeholder="Add responsibility"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addResponsibility(jobIndex)}
                                        className="text-sm text-indigo-600 hover:text-indigo-800"
                                    >
                                        + Add Another Responsibility
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addEmployment}
                            className="mt-4 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
                        >
                            + Add Another Position
                        </button>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Preview
                        </button>
                        <button
                            type="button"
                            onClick={handleGenerateCV}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Generate CV
                        </button>
                    </div>

                    {/* CV Preview */}
                    <CVPreview />
                </form>
            </div>
        </DashboardLayout>
    );
};

export default CV2;