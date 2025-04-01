import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllJobsusingFilters } from "../api/JobDetailsGetApi"; // Assume this function fetches job details by ID

function JobPage() {
  const { jobType, company } = useParams();
  const [job, setJob] = useState(null);
  

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await getAllJobsusingFilters("",""); // Test without filters
        console.log("Response:", response);
        if (response?.success && response.data.length > 0) {
          console.log("Job found:", response.data);
          setJob(response.data[0]); // Select the first job from the response
        } else {
          console.error("No jobs found");
          setJob(null); // Ensure job remains null if no data is found
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJob(null); // Handle network errors gracefully
      }
    }
    
  
    fetchJobDetails();
  }, [jobType, company]);
  
  if (!job) return <p>Loading job details...</p>;

  if (job === null) {
  return (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-600">Job Not Found</h1>
          <p className="text-gray-600">The job you are looking for does not exist or may have been removed.</p>
        </div>
      );
    }
    

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Title:{job.jobTitle}</h1>
      <p className="text-gray-600">{job.company}</p>
      <p className="mt-2">{job.description}</p>
      <p className="mt-4 text-blue-600">Location: {job.location}</p>
      <p className="mt-4 text-blue-600">Salary: {job.rate}</p>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {job.type}
      </span>
    </div>
  );
}

export default JobPage;
