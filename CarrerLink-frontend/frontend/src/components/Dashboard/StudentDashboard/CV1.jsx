import React, { useState, useRef } from 'react';
import DashboardLayout from '../StudentDashboard/StudentDashboardLayout';
import { Mail, Phone } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const CV1 = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        title: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        profile: '',
        skills: [''],
        languages: [{ name: '', proficiency: 5 }],
        experience: [{
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
            details: ['']
        }]
    });

    const cvPreviewRef = useRef(null);

    const handleInputChange = (e, section, index, field) => {
        const { value } = e.target;
        setFormData(prev => {
            if (section) {
                const newData = [...prev[section]];
                if (field) {
                    newData[index][field] = value;
                } else {
                    newData[index] = value;
                }
                return { ...prev, [section]: newData };
            }
            return { ...prev, [e.target.name]: value };
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
                filename: `${formData.fullName || 'CV'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save();
        }
    };

    const renderProficiency = (level) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= level ? '★' : '☆';
        }
        return stars;
    };

    const CVPreview = () => (
        <div ref={cvPreviewRef} style={{ display: 'none', backgroundColor: '#fff', padding: '20px', marginTop: '20px', border: '1px solid #ccc' }}>
            <div style={{ display: 'flex', backgroundColor: '#d32f2f', color: '#fff', padding: '20px' }}>
                <div style={{ flex: '1' }}>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>{formData.fullName || 'Full Name'}</h1>
                    <h2 style={{ fontSize: '18px', margin: '5px 0' }}>{formData.title || 'Professional Title'}</h2>
                </div>
                <div style={{ flex: '1' }}>
                    <p><Mail style={{ width: '16px', height: '16px', marginRight: '5px' }} /> {formData.email || 'email@example.com'}</p>
                    <p><Phone style={{ width: '16px', height: '16px', marginRight: '5px' }} /> {formData.phone || '+1 123 456 7890'}</p>
                    <p>{formData.address || '123 Main St, City'}</p>
                    <p><a href={formData.linkedin || '#'} style={{ color: '#fff' }}>linkedin.com/in/jane-smith</a></p>
                </div>
            </div>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: '1', paddingRight: '20px', backgroundColor: '#d32f2f', color: '#fff' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Skills</h3>
                    {formData.skills.map((skill, index) => skill && <p key={index}>{skill}</p>)}

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Communication: Building relationships with customers to facilitate sales</h3>
                    <p>Software: Experience with POS Systems Lightspeed and Vend.</p>
                    <p>Product knowledge: Developed comprehensive product knowledge of health and beauty products, contributing to an increase of £1,000 in monthly sales</p>
                    <p>Leadership: Train new members of staff, ensuring they understand the company policy and expected levels of service.</p>
                    <p>Accounting: Processing £2,000 daily in transactions.</p>
                    <p>Customer service: Received a 98% satisfaction rating from customer surveys.</p>
                    <p>Visual merchandising: Arranging displays attractively to promote products.</p>

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Languages</h3>
                    {formData.languages.map((lang, index) => lang.name && (
                        <p key={index}>{lang.name} {renderProficiency(lang.proficiency)}</p>
                    ))}
                </div>

                <div style={{ flex: '2' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Profile</h3>
                    <p>{formData.profile || 'Professional summary...'}</p>

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Employment</h3>
                    {formData.experience.map((exp, index) => exp.position && (
                        <div key={index}>
                            <h4>{exp.position} - {exp.company}, {exp.location}</h4>
                            <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                {exp.achievements.map((ach, idx) => ach && <li key={idx}>{ach}</li>)}
                            </ul>
                        </div>
                    ))}

                    <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px' }}>Education</h3>
                    {formData.education.map((edu, index) => edu.degree && (
                        <div key={index}>
                            <h4>{edu.degree} - {edu.institution}, {edu.location}</h4>
                            <p>{edu.startDate} - {edu.endDate}</p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                {edu.details.map((det, idx) => det && <li key={idx}>{det}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create Your Professional CV</h1>
                    <p className="text-gray-600 mt-2">Fill in your details to generate your CV</p>
                </div>

                <form className="space-y-8">
                    {/* Personal Information */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Professional Profile</h2>
                        <textarea
                            name="profile"
                            value={formData.profile}
                            onChange={handleInputChange}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Write a brief professional summary..."
                            required
                        />
                    </div>

                    {/* Skills Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Skills</h2>
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleInputChange(e, 'skills', index)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Enter a skill"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newSkills = [...formData.skills];
                                        newSkills.splice(index, 1);
                                        setFormData({ ...formData, skills: newSkills });
                                    }}
                                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, skills: [...formData.skills, ''] })}
                            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Skill
                        </button>
                    </div>

                    {/* Languages Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Languages</h2>
                        {formData.languages.map((language, index) => (
                            <div key={index} className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={language.name}
                                        onChange={(e) => handleInputChange(e, 'languages', index, 'name')}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="Language name"
                                    />
                                </div>
                                <div className="flex-1">
                                    <select
                                        value={language.proficiency}
                                        onChange={(e) => handleInputChange(e, 'languages', index, 'proficiency')}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="1">Basic</option>
                                        <option value="2">Intermediate</option>
                                        <option value="3">Advanced</option>
                                        <option value="4">Fluent</option>
                                        <option value="5">Native</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newLanguages = [...formData.languages];
                                        newLanguages.splice(index, 1);
                                        setFormData({ ...formData, languages: newLanguages });
                                    }}
                                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                languages: [...formData.languages, { name: '', proficiency: 5 }]
                            })}
                            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Language
                        </button>
                    </div>

                    {/* Experience Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Employment History</h2>
                        {formData.experience.map((exp, index) => (
                            <div key={index} className="mb-6 border-b pb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Position</label>
                                    <input
                                        type="text"
                                        value={exp.position}
                                        onChange={(e) => handleInputChange(e, 'experience', index, 'position')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="e.g., Sales Assistant"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company</label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => handleInputChange(e, 'experience', index, 'company')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="e.g., Company Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        value={exp.location}
                                        onChange={(e) => handleInputChange(e, 'experience', index, 'location')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="e.g., City, Country"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        value={exp.startDate}
                                        onChange={(e) => handleInputChange(e, 'experience', index, 'startDate')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        value={exp.endDate}
                                        onChange={(e) => handleInputChange(e, 'experience', index, 'endDate')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Achievements</label>
                                    {exp.achievements.map((ach, achIndex) => (
                                        <div key={achIndex} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={ach}
                                                onChange={(e) => {
                                                    const newAchievements = [...exp.achievements];
                                                    newAchievements[achIndex] = e.target.value;
                                                    handleInputChange(
                                                        { target: { value: newAchievements } },
                                                        'experience',
                                                        index,
                                                        'achievements'
                                                    );
                                                }}
                                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                placeholder="Enter an achievement"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newAchievements = [...exp.achievements];
                                                    newAchievements.splice(achIndex, 1);
                                                    handleInputChange(
                                                        { target: { value: newAchievements } },
                                                        'experience',
                                                        index,
                                                        'achievements'
                                                    );
                                                }}
                                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newAchievements = [...exp.achievements, ''];
                                            handleInputChange(
                                                { target: { value: newAchievements } },
                                                'experience',
                                                index,
                                                'achievements'
                                            );
                                        }}
                                        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Add Achievement
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newExperience = [...formData.experience];
                                        newExperience.splice(index, 1);
                                        setFormData({ ...formData, experience: newExperience });
                                    }}
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove Experience
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                experience: [...formData.experience, {
                                    position: '',
                                    company: '',
                                    location: '',
                                    startDate: '',
                                    endDate: '',
                                    achievements: ['']
                                }]
                            })}
                            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Experience
                        </button>
                    </div>

                    {/* Education Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Education</h2>
                        {formData.education.map((edu, index) => (
                            <div key={index} className="mb-6 border-b pb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => handleInputChange(e, 'education', index, 'degree')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="e.g., Level 2 Certificate in Retail Skills"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => handleInputChange(e, 'education', index, 'institution')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="e.g., City & Guilds"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        value={edu.location}
                                        onChange={(e) => handleInputChange(e, 'education', index, 'location')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="e.g., London"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        value={edu.startDate}
                                        onChange={(e) => handleInputChange(e, 'education', index, 'startDate')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        value={edu.endDate}
                                        onChange={(e) => handleInputChange(e, 'education', index, 'endDate')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Details</label>
                                    {edu.details.map((det, detIndex) => (
                                        <div key={detIndex} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={det}
                                                onChange={(e) => {
                                                    const newDetails = [...edu.details];
                                                    newDetails[detIndex] = e.target.value;
                                                    handleInputChange(
                                                        { target: { value: newDetails } },
                                                        'education',
                                                        index,
                                                        'details'
                                                    );
                                                }}
                                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                placeholder="Enter a detail"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newDetails = [...edu.details];
                                                    newDetails.splice(detIndex, 1);
                                                    handleInputChange(
                                                        { target: { value: newDetails } },
                                                        'education',
                                                        index,
                                                        'details'
                                                    );
                                                }}
                                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newDetails = [...edu.details, ''];
                                            handleInputChange(
                                                { target: { value: newDetails } },
                                                'education',
                                                index,
                                                'details'
                                            );
                                        }}
                                        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Add Detail
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newEducation = [...formData.education];
                                        newEducation.splice(index, 1);
                                        setFormData({ ...formData, education: newEducation });
                                    }}
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove Education
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                education: [...formData.education, {
                                    degree: '',
                                    institution: '',
                                    location: '',
                                    startDate: '',
                                    endDate: '',
                                    details: ['']
                                }]
                            })}
                            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Education
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

export default CV1;