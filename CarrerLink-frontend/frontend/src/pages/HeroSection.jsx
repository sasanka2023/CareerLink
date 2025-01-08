import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/HeroSection/students-recognize-the-importance-of-gaining-internship-experience-xlarge.png";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div
            className="h-screen flex flex-col justify-center items-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${heroImage})`,
            }}
        >
            <h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-6">
                Empowering Undergraduates and Connecting Companies
            </h1>
            <div className="flex space-x-4">
                <button
                    className="bg-white text-black py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-200"
                    onClick={() => navigate("/company-auth")} // Navigate to company auth page
                >
                    Explore as a Company
                </button>
                <button
                    className="bg-white text-black py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-200"
                    onClick={() => navigate("/student-auth")} // Navigate to student login page
                >
                    Explore as a Student
                </button>
            </div>
        </div>
    );
};

export default HeroSection;