import React, { useState, useEffect} from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getAllJobs } from '../api/JobDetailsGetApi';


function Jobs() {
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedTitle, setSelectedTitle] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const jobTitles = [
    'all',
    "Spring Boot Developer",
    "React Frontend Engineer",
    "Node.js Backend Developer",
    "Machine Learning Engineer",
    "Blockchain Developer",
    "DevOps Engineer",
    "Full Stack JavaScript Developer",
    "Cloud Engineer",
    "Microservices Developer"
    
  ];
  const companies = [
    'all',
    'IFS',
    'Neural Ninja',
    'SOFTGEN',
    'TECHSOLVE',
    'DIGIMARK',
    'NEXTGENAI',
    'Sysco Labs',
    'WSO2'

  ];

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getAllJobs();
        console.log(response)
        if (isMounted && response?.success) {
          setJobs(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => { isMounted = false };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!jobs.length) return <div>No jobs found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Job Types' : type}
                </option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
            >
              {jobTitles.map(title => (
                <option key={title} value={title}>
                  {title === 'all' ? 'All Job Titles' : title}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              {companies.map(company => (
                <option key={company} value={company}>
                  {company === 'all' ? 'All Companies' : company}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job.jobId} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={null}
                    alt={job.jobType}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{job.jobTitle}</h3>
                    <p className="text-sm text-blue-600">{job.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                </div>
                
                <div className="mt-4 flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.location}</span>
                </div>
                
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.type}
                  </span>
                </div>
                
                <button className="mt-4 w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  More Info
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;