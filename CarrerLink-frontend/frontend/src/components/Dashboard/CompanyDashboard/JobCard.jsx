import React, { useState, useEffect } from "react";
import { Edit2, X } from "lucide-react";

function JobCard({ job, onEdit, onClose }) {
    const [showConfirmClose, setShowConfirmClose] = useState(false);

    // Reset confirmation state when job status changes to CLOSED
    useEffect(() => {
        if (job.status === "CLOSED") {
            setShowConfirmClose(false);
        }
    }, [job.status]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                    <p>{job.companyName}</p>
                    <p className="text-gray-600">
                        {job.location} • {job.jobType}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                    job.status === "CLOSED"
                        ? "bg-red-100 text-red-700"
                        : job.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                }`}>
                {job.status}
            </span>
            </div>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {job.technologies.map((req, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
            {req.techName}
          </span>
                ))}
            </div>
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{job.applications} applications</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(job.jobId)}
                        className={`px-3 py-1 border border-gray-300 rounded-lg transition-colors flex items-center gap-1 ${
                            job.status === "CLOSED"
                                ? "bg-gray-100 cursor-not-allowed"
                                : "hover:bg-gray-50"
                        }`}
                        disabled={job.status === "CLOSED"}
                    >
                        <Edit2 className="h-4 w-4"/>
                        Edit
                    </button>

                    {/* Only show close buttons if job is not closed */}
                    {job.status !== "CLOSED" && (
                        showConfirmClose ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onClose(job.jobId)}
                                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setShowConfirmClose(false)}
                                    className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowConfirmClose(true)}
                                className="px-3 py-1 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1"
                            >
                                <X className="h-4 w-4"/>
                                Close
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default JobCard;