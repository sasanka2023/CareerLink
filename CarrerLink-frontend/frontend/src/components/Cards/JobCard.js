import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GrFormNext } from "react-icons/gr";


const JobCard = ({ jobId }) => {
    // const [jobData, setJobData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    //
    // useEffect(() => {
    //     // Fetch job data from backend
    //     const fetchJobData = async () => {
    //         try {
    //             const response = await fetch(`https://your-backend-url.com/jobs/${jobId}`);
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch job data");
    //             }
    //             const data = await response.json();
    //             setJobData(data);
    //             setLoading(false);
    //         } catch (err) {
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchJobData();
    // }, [jobId]);
    //
    // if (loading) {
    //     return <div className="text-center">Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div className="text-center text-red-500">Error: {error}</div>;
    // }
// Sample data for testing
    const jobData = {
        jobTitle: "Software Engineer",
        companyName: "IFS",
        description:
            "The role involves developing enterprise-level applications with cutting-edge technologies. Enjoy a collaborative and innovative work environment.",
        jobType: "Part-Time",
        location: "Colombo, Sri Lanka",
        recruiterName: "Lewis Daniel",
        recruiterImage:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    };
    return (
        <div className="relative flex flex-col p-4 my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div className="flex p-4">
                <div className="flex">
                    <img
                        alt={jobData.recruiterName}
                        src={jobData.recruiterImage}
                        className="relative inline-block h-16 w-16 rounded-full"
                    />
                    <div className="flex flex-col ml-3 text-sm">
                        <span className="text-xl font-semibold">{jobData.jobTitle}</span>
                        <div className="flex">
                            <span className="text-sm font-semibold">{jobData.companyName}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-4">
                <div className="text-slate-600 font-light">
                    {jobData.description}
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex flex-col">
                <div className="pt-4 pl-4 flex">
                    <div
                        className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                        {jobData.jobType}
                    </div>
                    <div className="pl-3">
                        <FaLocationDot/>
                    </div>
                    <p className="text-sm pl-2 text-gray-500">{jobData.location}</p>
                </div>
            </div>
            {/* More Info Button */}
            <div className="flex justify-end items-center px-0.5 space-x-2">
                <a
                    href={jobData.moreInfoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-1 rounded-full hover:underline transition-all flex items-center space-x-1"
                >
                    <span>Read More</span>
                    <GrFormNext className="text-base"/>
                </a>
            </div>

        </div>
    );
};

export default JobCard;
