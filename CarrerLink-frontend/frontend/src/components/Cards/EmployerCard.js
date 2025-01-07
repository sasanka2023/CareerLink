import React, { useEffect, useState } from 'react';
import { Mail, Phone, Globe } from 'lucide-react';
import '../../styles/Employercard.css';

const EmployerCard = () => {
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        // Backend logic to fetch data
        // Uncomment and replace the URL with your backend endpoint
        /*
        fetch('https://your-backend-url.com/api/company')
            .then(response => response.json())
            .then(data => setCompanyData(data))
            .catch(error => console.error('Error fetching data:', error));
        */

        // Static example data for testing
        const exampleData = {
            name: 'Tech Innovators',
            logo: '/api/placeholder/384/224',
            description: 'We are a leading company providing cutting-edge solutions.',
            email: 'info@techinnovators.com',
            phone: '+1 (800) 555-1234',
            website: 'https://www.techinnovators.com',
        };
        setCompanyData(exampleData);
    }, []);

    if (!companyData) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front rounded-lg overflow-hidden shadow-lg">
                    <div className="relative w-full h-full">
                        <img
                            src={companyData.logo}
                            alt="Company Logo"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <h1 className="text-white text-4xl font-extrabold font-sans">{companyData.name}</h1>
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-gray-900 text-white p-8 flex flex-col justify-between">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-center font-serif">{companyData.name}</h2>
                            <p className="text-gray-400 text-center text-sm font-light">
                                {companyData.description}
                            </p>
                        </div>

                        {/* Contact Links */}
                        <div className="flex justify-center gap-6">
                            <a
                                href={`mailto:${companyData.email}`}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Mail size={24} />
                            </a>
                            <a
                                href={`tel:${companyData.phone}`}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Phone size={24} />
                            </a>
                            <a
                                href={companyData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Globe size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerCard;
