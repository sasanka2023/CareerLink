import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllJobsusingFilters } from "../api/JobDetailsApi";
import { Briefcase, MapPin, Clock, DollarSign, Building2, GraduationCap, Code, GitBranch, Figma, MessageSquare } from 'lucide-react';

function JobPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchJobDetails = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await getAllJobsusingFilters(null, null);
  //       if (!response.success) throw new Error("Failed to fetch job details");

  //       const selectedJob = response.data.find((j) => j.jobId === parseInt(jobId || ''));
  //       if (selectedJob) {
  //         setJob(selectedJob);
  //       } else {
  //         setError("Job not found");
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch job details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchJobDetails();
  // }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {error || "Job not found"}
        </h2>
        <p className="text-gray-600">
          Please try again later or check the job ID
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{job.jobTitle}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Apply Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Job Type</p>
              <p className="text-sm">{job.jobType}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Schedule</p>
              <p className="text-sm">Full-Time</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Salary</p>
              <p className="text-sm">{job.salary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <GraduationCap className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
              <p className="text-gray-600">Bachelor's degree in Computer Science or related field</p>
            </div>
            <div className="flex items-start">
              <Code className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
              <p className="text-gray-600">Proficiency in HTML, CSS, and JavaScript</p>
            </div>
            <div className="flex items-start">
              <GitBranch className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
              <p className="text-gray-600">Experience with version control systems (Git)</p>
            </div>
            <div className="flex items-start">
              <Figma className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
              <p className="text-gray-600">Ability to create wireframes and interactive designs</p>
            </div>
            <div className="flex items-start">
              <MessageSquare className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
              <p className="text-gray-600">Excellent communication and collaboration skills</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;