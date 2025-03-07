import { getAllJobsByCompany } from "../../../api/JobDetailsGetApi";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../../api/AuthProvider';
import JobPostForm from "./JobPostForm";
import JobCard from "./JobCard";

function JobVacancies({ company }) {
    const [showJobForm, setShowJobForm] = useState(false);
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [jobVacancies, setJobVacancies] = useState([]);

    const handleEditJob = (id) => {
        console.log("Edit job:", id);
    };

    const handleCloseJob = (id) => {
        setJobVacancies((prev) =>
            prev.map((job) => (job.id === id ? { ...job, status: "Closed" } : job))
        );
    };

    const handlePostJob = (jobData) => {
        setJobVacancies((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                ...jobData,
                applications: 0,
                status: "Active",
            },
        ]);
        setShowJobForm(false);
    };

    useEffect(() => {
        let isMounted = true;
        const fetchCompanyData = async () => {
            if (!token) {
                if (isMounted) setLoading(false);
                return;
            }
            try {
                const response = await getAllJobsByCompany(company.id);
                if (isMounted && response?.success) {
                    setJobVacancies(response.data || []);
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Error fetching Job data:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCompanyData();
        return () => { isMounted = false; };
    }, [token]);

    console.log(jobVacancies);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Job Vacancies</h2>
                <button
                    onClick={() => setShowJobForm(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Post New Job
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobVacancies.map((job) => (
                    <JobCard
                        key={job.jobId}
                        job={job}
                        onEdit={handleEditJob}
                        onClose={handleCloseJob}
                    />
                ))}
            </div>
            {showJobForm && (
                <JobPostForm
                    onClose={() => setShowJobForm(false)}
                    onSubmit={handlePostJob}
                />
            )}
        </div>
    );
}

export default JobVacancies;