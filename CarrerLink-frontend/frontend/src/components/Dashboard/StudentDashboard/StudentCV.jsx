import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Heart, Wrench, FolderGit2, Award, Coffee, FileText, FileDown, Plus, Trash2 } from 'lucide-react';
import StudentDashboardLayout from "./StudentDashboardLayout";
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';


function App() {
    const [activeSection, setActiveSection] = useState('personal-info');
    const [formData, setFormData] = useState({
        personalInfo: {
            fullName: '',
            title: '',
            email: '',
            phone: '',
            location: '',
            summary: '',
            linkedin: '',
            github: '',
        },
        experience: [],
        education: [],
        softSkills: [],
        technicalSkills: {
            frontend: [],
            backend: [],
            languages: [],
            tools: [],
        },
        projects: [],
        certificates: [],
        extracurricular: [],
        references: [],
    });
    const [newSoftSkill, setNewSoftSkill] = useState('');
    const [newTechSkill, setNewTechSkill] = useState('');
    const [techCategory, setTechCategory] = useState('frontend');
    const [newTech, setNewTech] = useState('');
    const previewRef = useRef();


    const sections = [
        { id: 'personal-info', title: 'Personal Info', icon: <User className="w-5 h-5" /> },
        { id: 'experience', title: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'education', title: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'soft-skills', title: 'Soft Skills', icon: <Heart className="w-5 h-5" /> },
        { id: 'technical-skills', title: 'Technical Skills', icon: <Wrench className="w-5 h-5" /> },
        { id: 'projects', title: 'Projects', icon: <FolderGit2 className="w-5 h-5" /> },
        { id: 'certificates', title: 'Certificates', icon: <Award className="w-5 h-5" /> },
        { id: 'extracurricular', title: 'Extracurricular', icon: <Coffee className="w-5 h-5" /> }
        //{ id: 'references', title: 'References', icon: <FileText className="w-5 h-5" /> },
    ];

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value,
            },
        }));
    };

    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experience: [...prev.experience, {
                id: crypto.randomUUID(),
                title: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
            }],
        }));
    };

    const removeExperience = (id) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id),
        }));
    };

    const handleExperienceChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            ),
        }));
    };
    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, {
                id: crypto.randomUUID(),
                degree: '',
                institution: '',
                location: '',
                startDate: '',
                endDate: '',
                gpa: '',
                description: '',
            }],
        }));
    };

    const removeEducation = (id) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id),
        }));
    };

    const handleEducationChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const addSoftSkill = (skill) => {
        if (skill && !formData.softSkills.includes(skill)) {
            setFormData(prev => ({
                ...prev,
                softSkills: [...prev.softSkills, skill],
            }));
        }
    };

    const removeSoftSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            softSkills: prev.softSkills.filter((_, i) => i !== index),
        }));
    };

    const addTechnicalSkill = (category, skill) => {
        if (skill && !formData.technicalSkills[category].includes(skill)) {
            setFormData(prev => ({
                ...prev,
                technicalSkills: {
                    ...prev.technicalSkills,
                    [category]: [...prev.technicalSkills[category], skill],
                },
            }));
        }
    };

    const removeTechnicalSkill = (category, index) => {
        setFormData(prev => ({
            ...prev,
            technicalSkills: {
                ...prev.technicalSkills,
                [category]: prev.technicalSkills[category].filter((_, i) => i !== index),
            },
        }));
    };

    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                id: crypto.randomUUID(),
                name: '',
                description: '',
                technologies: [],
                link: '',
                startDate: '',
                endDate: '',
            }],
        }));
    };

    const removeProject = (id) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.filter(proj => proj.id !== id),
        }));
    };

    const handleProjectChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
                proj.id === id ? { ...proj, [field]: value } : proj
            ),
        }));
    };

    const addProjectTechnology = (projectId, tech) => {
        if (tech) {
            setFormData(prev => ({
                ...prev,
                projects: prev.projects.map(proj =>
                    proj.id === projectId && !proj.technologies.includes(tech)
                        ? { ...proj, technologies: [...proj.technologies, tech] }
                        : proj
                ),
            }));
        }
    };

    const removeProjectTechnology = (projectId, index) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
                proj.id === projectId
                    ? {
                        ...proj,
                        technologies: proj.technologies.filter((_, i) => i !== index)
                    }
                    : proj
            ),
        }));
    };

    const addCertificate = () => {
        setFormData(prev => ({
            ...prev,
            certificates: [...prev.certificates, {
                id: crypto.randomUUID(),
                name: '',
                issuer: '',
                date: '',
                link: '',
            }],
        }));
    };

    const removeCertificate = (id) => {
        setFormData(prev => ({
            ...prev,
            certificates: prev.certificates.filter(cert => cert.id !== id),
        }));
    };

    const handleCertificateChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            certificates: prev.certificates.map(cert =>
                cert.id === id ? { ...cert, [field]: value } : cert
            ),
        }));
    };

    const addExtracurricular = () => {
        setFormData(prev => ({
            ...prev,
            extracurricular: [...prev.extracurricular, {
                id: crypto.randomUUID(),
                activity: '',
                organization: '',
                role: '',
                startDate: '',
                endDate: '',
                description: '',
            }],
        }));
    };

    const removeExtracurricular = (id) => {
        setFormData(prev => ({
            ...prev,
            extracurricular: prev.extracurricular.filter(extra => extra.id !== id),
        }));
    };

    const handleExtracurricularChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            extracurricular: prev.extracurricular.map(extra =>
                extra.id === id ? { ...extra, [field]: value } : extra
            ),
        }));
    };

    const addReference = () => {
        setFormData(prev => ({
            ...prev,
            references: [...prev.references, {
                id: crypto.randomUUID(),
                name: '',
                title: '',
                company: '',
                email: '',
                phone: '',
            }],
        }));
    };

    const removeReference = (id) => {
        setFormData(prev => ({
            ...prev,
            references: prev.references.filter(ref => ref.id !== id),
        }));
    };

    const handleReferenceChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            references: prev.references.map(ref =>
                ref.id === id ? { ...ref, [field]: value } : ref
            ),
        }));
    };
    const handleDownloadPDF = () => {
        const element = previewRef.current;
        const opt = {
            margin:       0,
            filename:     'CV.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };


    const renderForm = () => {
        switch (activeSection) {
            case 'personal-info':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.personalInfo.fullName}
                                onChange={handlePersonalInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Professional Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.personalInfo.title}
                                onChange={handlePersonalInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.personalInfo.email}
                                    onChange={handlePersonalInfoChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.personalInfo.phone}
                                    onChange={handlePersonalInfoChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="(123) 456-7890"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.personalInfo.location}
                                onChange={handlePersonalInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="New York, NY"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Professional Summary
                            </label>
                            <textarea
                                name="summary"
                                value={formData.personalInfo.summary}
                                onChange={handlePersonalInfoChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief professional summary..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.personalInfo.linkedin}
                                    onChange={handlePersonalInfoChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://linkedin.com/in/johndoe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    name="github"
                                    value={formData.personalInfo.github}
                                    onChange={handlePersonalInfoChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://github.com/johndoe"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">

                            <button
                                onClick={() => setActiveSection('experience')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                );

            case 'experience':
                return (
                    <div className="space-y-6">
                        {formData.experience.map((exp, index) => (
                            <div key={exp.id} className="bg-gray-50 p-4 rounded-lg relative">
                                <button
                                    onClick={() => removeExperience(exp.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5"/>
                                </button>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.title}
                                            onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Senior Developer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Tech Company"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                                            disabled={exp.current}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={exp.current}
                                            onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">I currently work here</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={exp.description}
                                        onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Describe your responsibilities and achievements..."
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addExperience}
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2"/>
                            Add Experience
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setActiveSection('personal-info')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setActiveSection('education')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div className="space-y-6">
                        {formData.education.map((edu) => (
                            <div key={edu.id} className="bg-gray-50 p-4 rounded-lg relative">
                                <button
                                    onClick={() => removeEducation(edu.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5"/>
                                </button>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Degree
                                        </label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Bachelor of Science in Computer Science"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Institution
                                        </label>
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="University Name"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={edu.location}
                                        onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="City, Country"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="month"
                                            value={edu.startDate}
                                            onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="month"
                                            value={edu.endDate}
                                            onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            GPA
                                        </label>
                                        <input
                                            type="text"
                                            value={edu.gpa}
                                            onChange={(e) => handleEducationChange(edu.id, 'gpa', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="3.8/4.0"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={edu.description}
                                        onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Relevant coursework, honors, etc."
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addEducation}
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2"/>
                            Add Education
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setActiveSection('experience')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setActiveSection('soft-skills')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 'soft-skills':


                return (
                    <div className="space-y-6">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Add Soft Skills
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={newSoftSkill}
                                    onChange={(e) => setNewSoftSkill(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Example: Communication"
                                />
                                <button
                                    onClick={() => {
                                        addSoftSkill(newSoftSkill);
                                        setNewSoftSkill('');
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-700 mb-2">Your Soft Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {formData.softSkills.map((skill, index) => (
                                    <div key={index}
                                         className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                        <span>{skill}</span>
                                        <button
                                            onClick={() => removeSoftSkill(index)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                {formData.softSkills.length === 0 && (
                                    <p className="text-gray-500 italic">No soft skills added yet</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setActiveSection('education')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setActiveSection('technical-skills')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 'technical-skills':


                return (
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Add Technical Skills
                            </label>
                            <div className="flex mb-2">
                                <select
                                    value={techCategory}
                                    onChange={(e) => setTechCategory(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="languages">Languages</option>
                                    <option value="tools">Tools</option>
                                </select>
                                <input
                                    type="text"
                                    value={newTechSkill}
                                    onChange={(e) => setNewTechSkill(e.target.value)}
                                    className="flex-1 px-3 py-2 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Example: React"
                                />
                                <button
                                    onClick={() => {
                                        addTechnicalSkill(techCategory, newTechSkill);
                                        setNewTechSkill('');
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {Object.entries(formData.technicalSkills).map(([category, skills]) => (
                            <div key={category}>
                                <h3 className="font-medium text-gray-700 mb-2 capitalize">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <div key={index}
                                             className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                            <span>{skill}</span>
                                            <button
                                                onClick={() => removeTechnicalSkill(category, index)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    {skills.length === 0 && (
                                        <p className="text-gray-500 italic">No {category} skills added yet</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setActiveSection('soft-skills')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setActiveSection('projects')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 'projects':
                return (
                    <div className="space-y-6">
                        {formData.projects.map((project) => {

                            return (
                                <div key={project.id} className="bg-gray-50 p-4 rounded-lg relative">
                                    <button
                                        onClick={() => removeProject(project.id)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-5 h-5"/>
                                    </button>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Project Name
                                        </label>
                                        <input
                                            type="text"
                                            value={project.name}
                                            onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Project Name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Project Link (GitHub, Live Demo, etc.)
                                        </label>
                                        <input
                                            type="url"
                                            value={project.link}
                                            onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://github.com/username/project"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Start Date
                                            </label>
                                            <input
                                                type="month"
                                                value={project.startDate}
                                                onChange={(e) => handleProjectChange(project.id, 'startDate', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                End Date
                                            </label>
                                            <input
                                                type="month"
                                                value={project.endDate}
                                                onChange={(e) => handleProjectChange(project.id, 'endDate', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Describe the project and your role..."
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Technologies Used
                                        </label>
                                        <div className="flex mb-2">
                                            <input
                                                type="text"
                                                value={newTech}
                                                onChange={(e) => setNewTech(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Example: React"
                                            />
                                            <button
                                                onClick={() => {
                                                    addProjectTechnology(project.id, newTech);
                                                    setNewTech('');
                                                }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, index) => (
                                                <div key={index}
                                                     className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                                    <span>{tech}</span>
                                                    <button
                                                        onClick={() => removeProjectTechnology(project.id, index)}
                                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <button
                            onClick={addProject}
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2"/>
                            Add Project
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setActiveSection('technical-skills')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setActiveSection('certificates')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 'certificates':
                return (
                    <div className="space-y-6">
                        {formData.certificates.map((cert) => (
                            <div key={cert.id} className="bg-gray-50 p-4 rounded-lg relative">
                                <button
                                    onClick={() => removeCertificate(cert.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5"/>
                                </button>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Certificate Name
                                        </label>
                                        <input
                                            type="text"
                                            value={cert.name}
                                            onChange={(e) => handleCertificateChange(cert.id, 'name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="AWS Certified Developer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Issuing Organization
                                        </label>
                                        <input
                                            type="text"
                                            value={cert.issuer}
                                            onChange={(e) => handleCertificateChange(cert.id, 'issuer', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Amazon Web Services"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Issue Date
                                        </label>
                                        <input
                                            type="month"
                                            value={cert.date}
                                            onChange={(e) => handleCertificateChange(cert.id, 'date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Certificate Link
                                        </label>
                                        <input
                                            type="url"
                                            value={cert.link}
                                            onChange={(e) => handleCertificateChange(cert.id, 'link', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://credential.net/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addCertificate}
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2"/>
                            Add Certificate
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setActiveSection('projects')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setActiveSection('extracurricular')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 'extracurricular':
    return (
                    <div className="space-y-6">
                        {formData.extracurricular.map((extra) => (
                            <div key={extra.id} className="bg-gray-50 p-4 rounded-lg relative">
                                <button
                                    onClick={() => removeExtracurricular(extra.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5"/>
                                </button>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Activity
                                        </label>
                                        <input
                                            type="text"
                                            value={extra.activity}
                                            onChange={(e) => handleExtracurricularChange(extra.id, 'activity', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Volunteer Work"
                />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Organization
                                        </label>
                                        <input
                                            type="text"
                                            value={extra.organization}
                                            onChange={(e) => handleExtracurricularChange(extra.id, 'organization', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Red Cross"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        value={extra.role}
                                        onChange={(e) => handleExtracurricularChange(extra.id, 'role', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Team Leader"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="month"
                                            value={extra.startDate}
                                            onChange={(e) => handleExtracurricularChange(extra.id, 'startDate', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="month"
                                            value={extra.endDate}
                                            onChange={(e) => handleExtracurricularChange(extra.id, 'endDate', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                </div>
            </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={extra.description}
                                        onChange={(e) => handleExtracurricularChange(extra.id, 'description', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Describe your responsibilities and achievements..."
                                    />
                                </div>
                            </div>
                        ))}
                <button
                            onClick={addExtracurricular}
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                            <Plus className="w-5 h-5 mr-2"/>
                            Add Extracurricular Activity
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setActiveSection('certificates')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Back
                </button>
            </div>
        </div>
    );

            default:
                return null;
        }
    };

    return (
        <StudentDashboardLayout>
            <div className="relative flex h-screen">

                <button
                    onClick={handleDownloadPDF}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors shadow">
                    <FileDown className="w-5 h-5 mr-2"/>
                    Export PDF
                </button>

                {/* Main Content */}
                <div className="flex-1 flex">
                    {/* Form Area */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6">{sections.find(s => s.id === activeSection)?.title}</h2>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                {renderForm()}
                            </div>
                        </div>

                    </div>

                    {/* Preview Area */}
                    <div ref={previewRef} className="w-[800px] bg-gray-50 border-l p-8 overflow-y-auto">
                        <div className="bg-white shadow-lg p-8 min-h-[700px]">
                            <h1 className="text-3xl font-bold text-blue-900">{formData.personalInfo.fullName || 'John Doe'}</h1>
                            <p className="text-lg text-blue-600 mb-4">{formData.personalInfo.title || 'Software Engineer'}</p>

                            <div className="flex items-center text-sm text-gray-600 space-x-4 mb-6">
                                <span>{formData.personalInfo.location || 'New York, NY'}</span>
                                <span>{formData.personalInfo.phone || '(123) 456-7890'}</span>
                                <span>{formData.personalInfo.email || 'john.doe@example.com'}</span>
                            </div>

                            <p className="text-gray-700 mb-8">
                                {formData.personalInfo.summary || 'Experienced software engineer with a passion for building innovative solutions.'}
                            </p>

                            {formData.experience.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                        Experience
                                    </h2>
                                    {formData.experience.map(exp => (
                                        <div key={exp.id} className="mb-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold">{exp.title}</h3>
                                                    <p className="text-gray-600">{exp.company}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                                </p>
                                            </div>
                                            <p className="text-gray-700 mt-2">{exp.description}</p>
                                        </div>
                                    ))}
                                </section>
                            )}
                            {formData.education.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                        Education
                                    </h2>
                                    {formData.education.map(edu => (
                                        <div key={edu.id} className="mb-4">
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

                            {/* Soft Skills Section Preview */}
                            {formData.softSkills.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                        Soft Skills
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.softSkills.map((skill, index) => (
                                            <span key={index} className=" text-gray-700 px-3 py-1 rounded-full text-sm">
          {skill}
        </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Technical Skills Section Preview */}
                            {(formData.technicalSkills.frontend.length > 0 ||
                                formData.technicalSkills.backend.length > 0 ||
                                formData.technicalSkills.languages.length > 0 ||
                                formData.technicalSkills.tools.length > 0) && (
                                <section className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                        Technical Skills
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {formData.technicalSkills.frontend.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Frontend</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.technicalSkills.frontend.map((skill, index) => (
                                                        <span key={index}
                                                              className=" text-gray-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {formData.technicalSkills.backend.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Backend</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.technicalSkills.backend.map((skill, index) => (
                                                        <span key={index}
                                                              className="text-gray-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {formData.technicalSkills.languages.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Languages</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.technicalSkills.languages.map((skill, index) => (
                                                        <span key={index}
                                                              className="text-gray-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {formData.technicalSkills.tools.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Tools</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.technicalSkills.tools.map((skill, index) => (
                                                        <span key={index}
                                                              className="text-gray-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Projects Section Preview */}
                            {formData.projects.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                        Projects
                                    </h2>
                                    {formData.projects.map(project => (
                                        <div key={project.id} className="mb-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold">{project.name}</h3>
                                                    {project.link && (
                                                        <a href={project.link}
                                                           className="text-blue-600 text-sm hover:underline"
                                                           target="_blank" rel="noopener noreferrer">
                                                            Project Link
                                                        </a>
                                                    )}
                                                </div>
                                                {(project.startDate || project.endDate) && (
                                                    <p className="text-sm text-gray-500">
                                                        {project.startDate && project.startDate}
                                                        {project.startDate && project.endDate && " - "}
                                                        {project.endDate && project.endDate}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="text-gray-700 mt-2">{project.description}</p>
                                            {project.technologies.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {project.technologies.map((tech, index) => (
                                                        <span key={index}
                                                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {tech}
              </span>
                                                    ))}
                </div>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Certificates Section Preview */}
                            {formData.certificates.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                        Certificates
                                    </h2>
                                    {formData.certificates.map(cert => (
                                        <div key={cert.id} className="mb-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold">{cert.name}</h3>
                                                    <p className="text-gray-600">Issued by {cert.issuer}</p>
                                                    {cert.link && (
                                                        <a href={cert.link}
                                                           className="text-blue-600 text-sm hover:underline"
                                                           target="_blank" rel="noopener noreferrer">
                                                            View Certificate
                                                        </a>
                                                    )}
                                                </div>
                                                {cert.date && <p className="text-sm text-gray-500">{cert.date}</p>}
                                            </div>
                                        </div>
                    ))}
                                </section>
                            )}

                            {/* Extracurricular Section Preview */}
                            {formData.extracurricular.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-900 border-b border-blue-900 pb-2 mb-4">
                                        Extracurricular Activities
                                    </h2>
                                    {formData.extracurricular.map(activity => (
                                        <div key={activity.id} className="mb-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold">{activity.activity}</h3>
                                                    <p className="text-gray-600">
                                                        {activity.organization} {activity.role && `- ${activity.role}`}
                                                    </p>
                                                </div>
                                                {(activity.startDate || activity.endDate) && (
                                                    <p className="text-sm text-gray-500">
                                                        {activity.startDate && activity.startDate}
                                                        {activity.startDate && activity.endDate && " - "}
                                                        {activity.endDate && activity.endDate}
                                                    </p>
                                                )}
                                            </div>
                                            {activity.description &&
                                                <p className="text-gray-700 mt-2">{activity.description}</p>}
                                        </div>
                                    ))}
                                </section>
                            )}
                            {/* Other sections will be added here */}
                </div>
                </div>
            </div>
            </div>
        </StudentDashboardLayout>
    );
}

export default App;