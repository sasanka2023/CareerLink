import { useState } from 'react';
import ApplyModal from './ApplyModal';

function StudentJobCard({ job, onApply, className }) {
    const [showApplyModal, setShowApplyModal] = useState(false);

    const handleApplyClick = async (coverLetter) => {
        try {
            await onApply(job.jobId, coverLetter);
            return true;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm p-6 flex flex-col h-full ${className}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                    <p className="text-gray-600">
                        {job.location} • {job.jobType}
                    </p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-sm ${
                        job.status === "CLOSED"
                            ? "bg-red-100 text-red-700"
                            : job.status === "ACTIVE"
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-600"
                    }`}
                >
                    {job.status}
                </span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {job.technologies.map((req, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {req.techName}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center mt-auto">
                <p className="text-sm text-gray-600">{job.applications} applications</p>

                {job.applied ? (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                        Applied ✓
                    </span>
                ) : (
                    <button
                        onClick={() => setShowApplyModal(true)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            job.status === "CLOSED"
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                        disabled={job.status === "CLOSED"}
                    >
                        {job.status === "CLOSED" ? "Closed" : "Apply Now"}
                    </button>
                )}
            </div>

            {showApplyModal && (
                <ApplyModal
                    jobTitle={job.jobTitle}
                    onClose={() => setShowApplyModal(false)}
                    onApply={handleApplyClick}
                />
            )}
        </div>
    );
}

export default StudentJobCard;