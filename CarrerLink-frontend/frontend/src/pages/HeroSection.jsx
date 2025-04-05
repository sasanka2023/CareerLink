import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Users, Building2, ArrowRight, Briefcase } from 'lucide-react';
import heroimg from "../assets/HeroSection/HeroImg.jpg";

const HeroSection = () => {


    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 py-24 md:py-32 flex flex-col md:flex-row items-center">
                    {/* Left side content */}
                    <div className="md:w-1/2 mb-12 md:mb-0">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Connect Your Future<br/>
                            <span className="text-indigo-600">With Top Companies</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                            Join thousands of students and companies making meaningful connections. Your next career
                            opportunity awaits.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/student-auth"
                                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                            >
                                Find Opportunities <ArrowRight className="w-5 h-5"/>
                            </Link>
                            <Link
                                to="/company-auth"
                                className="px-8 py-4 bg-white text-in digo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
                                For Companies
                            </Link>
                        </div>
                    </div>
                    {/* Right side image */}
                    <div className="md:w-1/2 relative">
                        <img
                            src={heroimg}
                            alt="Team collaboration"
                            className="rounded-xl shadow-2xl animate-float"
                        />
                        <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-600"/>
                                <span className="font-semibold">10,000+ Successful Placements</span>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-indigo-600"/>
                                <span className="font-semibold">500+ Partner Companies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;