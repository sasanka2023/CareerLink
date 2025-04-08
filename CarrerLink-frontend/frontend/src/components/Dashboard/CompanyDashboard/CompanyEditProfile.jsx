import React, { useState, useEffect, useContext } from 'react';
import { Mail, MapPin, Briefcase, Globe, Smartphone, Users, Type, Tag, ListChecks,Camera } from 'lucide-react';
import { AuthContext } from '../../../api/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCompanyDetailsByUsername, updateCompany } from '../../../api/CompanyDetailsApi';

const allTechnologies = [
    "Spring Boot", "React", "Node.js", "Python", "MongoDB",
    "JavaScript", "TypeScript", "Java", "C++", "Docker",
    "Kubernetes", "AWS", "Azure", "GraphQL", "REST API",
];

function CompanyEditProfile() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [company, setCompany] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null); // For preview
    const [coverImagePreview, setCoverImagePreview] = useState(null); // For preview
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        slogan: '',
        description: '',
        category: '',
        mobile: '',
        location: '',
        requirements: '',
        website: '',
        size: '',
        technologies: [],
    });
    const [companyImage, setCompanyImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);


    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const username = extractUsernameFromToken(token);
                const response = await getCompanyDetailsByUsername(username);
                if (response?.success) {
                    setCompany(response.data);
                    setFormData({
                        id: response.data.id,
                        name: response.data.name,
                        slogan: response.data.slogan,
                        description: response.data.description,
                        category: response.data.category,
                        mobile: response.data.mobile,
                        location: response.data.location,
                        requirements: response.data.requirements,
                        website: response.data.website,
                        size: response.data.size,
                        technologies: response.data.technologies || [],
                    });
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        if (token) fetchCompanyData();
    }, [token]);

    const extractUsernameFromToken = (token) => {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.userId;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        const type = e.target.name;

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                if (type === 'companyImage') {
                    setCompanyImage(file);
                    setProfilePicture(reader.result); // or setCompanyImagePreview
                } else if (type === 'coverImage') {
                    setCoverImage(file);
                    setCoverImagePreview(reader.result);
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const addTechnology = (tech) => {
        if (!formData.technologies.some(t => t.techName === tech)) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, { techName: tech }]
            }));
        }
    };

    const removeTechnology = (tech) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(t => t.techName !== tech)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append(
            "company",
            new Blob([JSON.stringify(formData)], { type: "application/json" })
        );
        if (companyImage) form.append("companyImage", companyImage);
        if (coverImage) form.append("coverImage", coverImage);

        try {
            const response = await updateCompany(form);
            Swal.fire({
                title: "Updated Successfully!",
                icon: "success",
            });
            navigate('/company-dashboard');
        } catch (error) {
            Swal.fire({
                title: "Update Failed",
                text: error.response?.data?.message || 'Please try again later.',
                icon: "error",
            });
        }
    };

    if (!company) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Edit Company Profile</h2>
            <div className="bg-white items-center rounded-xl shadow-sm p-8">
                <div className="flex flex-row items-center justify-center mb-8 p-6 ">
                    {/* Company Image Upload */}
                    <div className="relative">
                        <img
                            src={profilePicture || company?.companyImageUrl || '/placeholder-company.png'} // fallback
                            alt="Company"
                            className="w-40 h-40 border-gray-300 border rounded-full object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            name="companyImage"
                            className="hidden"
                            id="companyImageInput"
                        />
                        <label
                            htmlFor="companyImageInput"
                            className="absolute -bottom-1 -right-1 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            <Camera className="h-5 w-5" />
                        </label>
                    </div>

                    {/* Cover Image Upload */}
                    <div className="relative">
                        <img
                            src={coverImagePreview || company?.coverImageUrl || '/placeholder-cover.jpg'} // fallback
                            alt="Cover"
                            className="w-96 h-40 pl-4  ml-4 border-gray-300 border rounded-xl object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            name="coverImage"
                            id="coverImageInput"
                        />
                        <label
                            htmlFor="coverImageInput"
                            className="absolute -bottom-1 -right-1 p-2  bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            <Camera className="h-5 w-5" />
                        </label>
                    </div>

                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Company Name */}
                        <div className="flex items-center space-x-4">
                            <Type className="h-5 w-5 text-gray-400"/>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        {/* Slogan */}
                        <div className="flex items-center space-x-4">
                            <Type className="h-5 w-5 text-gray-400"/>
                            <input
                                type="text"
                                name="slogan"
                                value={formData.slogan}
                                onChange={handleChange}
                                placeholder="Company Slogan"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex items-center space-x-4">
                            <Briefcase className="h-5 w-5 text-gray-400"/>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Company Description"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                rows="4"
                            />
                        </div>

                        {/* Category */}
                        <div className="flex items-center space-x-4">
                            <Tag className="h-5 w-5 text-gray-400"/>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="IT">IT & Software</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Retail">Retail</option>
                            </select>
                        </div>

                        {/* Requirements */}
                        <div className="flex items-center space-x-4">
                            <ListChecks className="h-5 w-5 text-gray-400"/>
                            <textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                placeholder="Job Requirements"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                rows="3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Location */}
                            <div className="flex items-center space-x-4">
                                <MapPin className="h-5 w-5 text-gray-400"/>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            {/* Mobile */}
                            <div className="flex items-center space-x-4">
                                <Smartphone className="h-5 w-5 text-gray-400"/>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Website */}
                            <div className="flex items-center space-x-4">
                                <Globe className="h-5 w-5 text-gray-400"/>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="Website URL"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            {/* Company Size */}
                            <div className="flex items-center space-x-4">
                                <Users className="h-5 w-5 text-gray-400"/>
                                <select
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">Company Size</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="501+">501+ employees</option>
                                </select>
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Technologies</h3>
                            <select
                                onChange={(e) => addTechnology(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select a technology</option>
                                {allTechnologies.map(tech => (
                                    <option key={tech} value={tech}>{tech}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies.map(tech => (
                                    <span
                                        key={tech.techName}
                                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center"
                                    >
                                        {tech.techName}
                                        <button
                                            type="button"
                                            onClick={() => removeTechnology(tech.techName)}
                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>




                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CompanyEditProfile;
