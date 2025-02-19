import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllJobsusingFilters } from "../api/JobDetailsGetApi"; // Correct function import
import "../styles/JobPages.css"; // Import CSS for styling


const JobPage = () => {
  const { jobId } = useParams(); // Get jobId from URL params
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Fetch all jobs (without filters)
        const response = await getAllJobsusingFilters(null, null);
        if (!response.success) throw new Error("API response error");

        // Find job by ID
        const selectedJob = response.data.find((j) => j.jobId === parseInt(jobId));
        if (selectedJob) {
          setJob(selectedJob);
        } else {
          setError("Job not found");
        }
      } catch (error) {
        setError("Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-page">
      {/* Top Section (Job Title, Location, Salary, Apply Button) */}
      <div className="job-header">
        <h1  className="job-title">{job?.jobTitle}</h1>
        <p className="job-meta">{job?.jobType} | {job?.location} | ${job?.salary}</p>
        <div className="job-container">
          <button className="apply-button">Apply Now</button>
         </div> 
      </div>

      {/* Job Description & Requirements */}
      <div className="job-content">
        <h3>Job description</h3>
        {job?.description}
        <br/>
        <br/>
        <br/>


        <h3>Requirements</h3>
        <p>
              A bachelor's degree in Computer Science<br/>
              Proficiency in HTML, CSS, and JavaScript<br/>
              Knowledge of version control systems like Git<br/>
              Ability to create wireframes, mockups, and interactive designs<br/>
              Excellent communication skills
        </p>
          
        
      </div>
    </div>
  );
};

export default JobPage;
