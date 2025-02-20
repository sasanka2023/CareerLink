import React, { useState, useRef } from 'react';
import DashboardLayout from '../StudentDashboard/StudentDashboardLayout';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import html2pdf from 'html2pdf.js';

const CV4 = () => {
    const [formData, setFormData] = useState({
        personalDetails: {
            name: '',
            email: '',
            phone: '',
            address: '',
            linkedin: ''
        },
        headline: '',
        summary: '',
        employment: [{
            position: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            achievements: ['']
        }],
        education: [{
            degree: '',
            institution: '',
            location: '',
            startDate: '',
            endDate: '',
            details: ''
        }],
        professionalAffiliations: [{
            organization: '',
            role: '',
            startDate: '',
            endDate: ''
        }],
        skills: [{
            category: '',
            description: ''
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

    const handleArrayChange = (section, index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev[section]];
            if (field) {
                newArray[index] = { ...newArray[index], [field]: value };
            } else {
                newArray[index] = value;
            }
            return { ...prev, [section]: newArray };
        });
    };

    const addItem = (section, template) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], template]
        }));
    };

    const addAchievement = (employmentIndex) => {
        setFormData(prev => {
            const newEmployment = [...prev.employment];
            newEmployment[employmentIndex].achievements.push('');
            return { ...prev, employment: newEmployment };
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
                filename: `${formData.personalDetails.name || 'CV'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save();
        }
    };

    const CVPreview = () => (
        <div ref={cvPreviewRef} style={{ display: 'none', backgroundColor: '#fff', padding: '20px', marginTop: '20px', border: '1px solid #ccc', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', backgroundColor: '#4a148c', color: '#fff', padding: '20px' }}>
                <div style={{ flex: '1' }}>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>{formData.personalDetails.name || 'Full Name'}</h1>
                    <h2 style={{ fontSize: '18px', margin: '5px 0' }}>{formData.headline || 'Professional Headline'}</h2>
                </div>
                <div style={{ flex: '1' }}>
                    <p><EnvelopeIcon className="h-5 w-5 inline mr-2" /> {formData.personalDetails.email || 'email@example.com'}</p>
                    <p>{formData.personalDetails.phone || '+44 123 456 7890'}</p>
                    <p>{formData.personalDetails.address || '123 Main St, City'}</p>
                    <p><UserIcon className="h-5 w-5 inline mr-2" /> <a href={formData.personalDetails.linkedin || '#'} style={{ color: '#fff' }}>{formData.personalDetails.linkedin || 'linkedin.com/in/your-profile'}</a></p>
                </div>
            </div>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: '1', paddingRight: '20px', backgroundColor: '#4a148c', color: '#fff' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Personal details</h3>
                    <p>LinkedIn</p>
                    <p><a href={formData.personalDetails.linkedin || '#'} style={{ color: '#fff' }}>{formData.personalDetails.linkedin || 'linkedin.com/in/your-profile'}</a></p>

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Professional Affiliations</h3>
                    {formData.professionalAffiliations.map((affiliation, index) => affiliation.organization && (
                        <p key={index}>{affiliation.organization} - {affiliation.role}, {affiliation.startDate} - {affiliation.endDate}</p>
                    ))}

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Skills</h3>
                    {formData.skills.map((skill, index) => skill.category && (
                        <div key={index}>
                            <p><strong>{skill.category}</strong></p>
                            <p>{skill.description}</p>
                        </div>
                    ))}
                </div>

                <div style={{ flex: '2' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Profile</h3>
                    <p>{formData.summary || 'Professional summary...'}</p>

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Employment</h3>
                    {formData.employment.map((job, index) => job.position && (
                        <div key={index}>
                            <h4>{job.position} - {job.company}, {job.location}</h4>
                            <p>{job.startDate} - {job.endDate || 'Present'}</p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                {job.achievements.map((ach, achIndex) => ach && <li key={achIndex}>{ach}</li>)}
                            </ul>
                        </div>
                    ))}

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Education</h3>
                    {formData.education.map((edu, index) => edu.degree && (
                        <div key={index}>
                            <h4>{edu.degree} - {edu.institution}, {edu.location}</h4>
                            <p>{edu.startDate} - {edu.endDate}</p>
                            <p>{edu.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Mechanical Engineering CV Builder</h1>

                <form className="space-y-8">
                    {/* Personal Details Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.personalDetails.name}
                                    onChange={(e) => handleInputChange('personalDetails', 'name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={formData.personalDetails.email}
                                        onChange={(e) => handleInputChange('personalDetails', 'email', e.target.value)}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.personalDetails.phone}
                                    onChange={(e) => handleInputChange('personalDetails', 'phone', e.target.value)}
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
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="url"
                                        value={formData.personalDetails.linkedin}
                                        onChange={(e) => handleInputChange('personalDetails', 'linkedin', e.target.value)}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Headline */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Professional Headline</h2>
                        <input
                            type="text"
                            value={formData.headline}
                            onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="e.g., Mechanical Engineer with 4+ Years Experience"
                            required
                        />
                    </div>

                    {/* Professional Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                        <textarea
                            value={formData.summary}
                            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Write a brief professional summary highlighting your key achievements and expertise..."
                            required
                        />
                    </div>

                    {/* Employment History */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Employment History</h2>
                        {formData.employment.map((job, jobIndex) => (
                            <div key={jobIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Position</label>
                                        <input
                                            type="text"
                                            value={job.position}
                                            onChange={(e) => handleArrayChange('employment', jobIndex, 'position', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Company</label>
                                        <input
                                            type="text"
                                            value={job.company}
                                            onChange={(e) => handleArrayChange('employment', jobIndex, 'company', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="text"
                                            value={job.startDate}
                                            onChange={(e) => handleArrayChange('employment', jobIndex, 'startDate', e.target.value)}
                                            placeholder="e.g., Feb 2018"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="text"
                                            value={job.endDate}
                                            onChange={(e) => handleArrayChange('employment', jobIndex, 'endDate', e.target.value)}
                                            placeholder="e.g., Present"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            value={job.location}
                                            onChange={(e) => handleArrayChange('employment', jobIndex, 'location', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                                    {job.achievements.map((achievement, achievementIndex) => (
                                        <div key={achievementIndex} className="mt-2">
                                            <input
                                                type="text"
                                                value={achievement}
                                                onChange={(e) => {
                                                    const newEmployment = [...formData.employment];
                                                    newEmployment[jobIndex].achievements[achievementIndex] = e.target.value;
                                                    setFormData(prev => ({ ...prev, employment: newEmployment }));
                                                }}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                placeholder="Add key achievement"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addAchievement(jobIndex)}
                                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                                    >
                                        + Add Achievement
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addItem('employment', {
                                position: '',
                                company: '',
                                location: '',
                                startDate: '',
                                endDate: '',
                                achievements: ['']
                            })}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            + Add Employment
                        </button>
                    </div>

                    {/* Education */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Education</h2>
                        {formData.education.map((edu, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Degree/Course</label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Institution</label>
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            value={edu.location}
                                            onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="text"
                                            value={edu.startDate}
                                            onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="text"
                                            value={edu.endDate}
                                            onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                                        <textarea
                                            value={edu.details}
                                            onChange={(e) => handleArrayChange('education', index, 'details', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addItem('education', {
                                degree: '',
                                institution: '',
                                location: '',
                                startDate: '',
                                endDate: '',
                                details: ''
                            })}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            + Add Education
                        </button>
                    </div>

                    {/* Professional Affiliations */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Professional Affiliations</h2>
                        {formData.professionalAffiliations.map((affiliation, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Organization</label>
                                        <input
                                            type="text"
                                            value={affiliation.organization}
                                            onChange={(e) => handleArrayChange('professionalAffiliations', index, 'organization', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Role</label>
                                        <input
                                            type="text"
                                            value={affiliation.role}
                                            onChange={(e) => handleArrayChange('professionalAffiliations', index, 'role', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="text"
                                            value={affiliation.startDate}
                                            onChange={(e) => handleArrayChange('professionalAffiliations', index, 'startDate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="text"
                                            value={affiliation.endDate}
                                            onChange={(e) => handleArrayChange('professionalAffiliations', index, 'endDate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addItem('professionalAffiliations', {
                                organization: '',
                                role: '',
                                startDate: '',
                                endDate: ''
                            })}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            + Add Affiliation
                        </button>
                    </div>

                    {/* Skills */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Skills</h2>
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Skill Category</label>
                                        <input
                                            type="text"
                                            value={skill.category}
                                            onChange={(e) => handleArrayChange('skills', index, 'category', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            placeholder="e.g., Software"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            value={skill.description}
                                            onChange={(e) => handleArrayChange('skills', index, 'description', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addItem('skills', { category: '', description: '' })}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            + Add Skill
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

export default CV4;