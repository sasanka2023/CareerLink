import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../StudentDashboard/StudentDashboardLayout';
import { FileText, Briefcase, GraduationCap, Award } from 'lucide-react';

const CVTemplate = ({ title, icon: Icon, description, image, accent, templatePath }) => {
    const navigate = useNavigate();

    const handleUseTemplate = () => {
        navigate(templatePath);
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer border-t-4 ${accent} md:h-[400px] lg:h-[450px] w-full max-w-sm mx-auto`}>
            <div className="relative h-48 md:h-60 lg:h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white" />
                </div>
            </div>
            <div className="p-4 md:p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
                <button
                    onClick={handleUseTemplate}
                    className="w-full px-4 py-2 md:px-6 md:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm md:text-base"
                >
                    Use Template
                </button>
            </div>
        </div>
    );
};

const StudentCV = () => {
    const templates = [
        {
            title: "Template 1",
            icon: GraduationCap,
            description: "Clean and modern CV template perfect for job applications. Features a sidebar design with clear sections for personal details, skills, and experience.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
            accent: "border-blue-500",
            templatePath: "/cv/template1"
        },
        {
            title: "Template 2",
            icon: FileText,
            description: "Optimized for tech internships and entry-level positions. Emphasizes programming languages, technical projects, and certifications.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
            accent: "border-purple-500",
            templatePath: "/cv/template2"
        },
        {
            title: "Template 3",
            icon: Award,
            description: "Ideal for research positions and academic roles. Highlights research projects, publications, and academic achievements.",
            image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80",
            accent: "border-emerald-500",
            templatePath: "/cv/template3"
        },
        {
            title: "Template 4",
            icon: Briefcase,
            description: "Designed for business and consulting roles. Emphasizes leadership experience, case competitions, and analytical skills.",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
            accent: "border-amber-500",
            templatePath: "/cv/template4"
        }
    ];

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Interview-Ready CV Templates</h1>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Choose a professional template tailored for your dream job interview</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {templates.map((template, index) => (
                        <CVTemplate key={index} {...template} />
                    ))}
                </div>

                <div className="mt-8 sm:mt-12 bg-indigo-50 rounded-xl p-4 sm:p-6 md:p-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-4">CV Writing Tips</h2>
                    <ul className="space-y-3 text-indigo-800 text-sm sm:text-base">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Tailor your CV to the specific job position you're applying for
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Highlight relevant coursework and projects that demonstrate your skills
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Include quantifiable achievements and metrics where possible
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Keep your CV concise and well-organized - aim for 1-2 pages
                        </li>
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentCV;