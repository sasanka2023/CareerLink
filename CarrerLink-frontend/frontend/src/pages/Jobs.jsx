import React, { useState, useEffect } from 'react';
import { MapPin, ArrowUpRight, Filter } from 'lucide-react';
import { getAllJobs } from '../api/JobDetailsGetApi';

function JobFilters({ onFilterChange, jobTypes, jobTitles, companies }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            onChange={(e) => onFilterChange('jobType', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {jobTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Job Types' : type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <select
            name="jobTitle"
            onChange={(e) => onFilterChange('jobTitle', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {jobTitles.map(title => (
              <option key={title} value={title}>
                {title === 'all' ? 'All Job Titles' : title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <select
            name="company"
            onChange={(e) => onFilterChange('company', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {companies.map(company => (
              <option key={company} value={company}>
                {company === 'all' ? 'All Companies' : company}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={job.companyLogo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"}
            alt={job.jobType}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{job.jobTitle}</h3>
            <p className="text-sm text-blue-600">{job.company}</p>
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
  );
}

function Jobs() {
  const [filters, setFilters] = useState({
    jobType: 'all',
    jobTitle: 'all',
    company: 'all'
  });
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

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.jobType === 'all' || job.type === filters.jobType) &&
      (filters.jobTitle === 'all' || job.jobTitle === filters.jobTitle) &&
      (filters.company === 'all' || job.company === filters.company)
    );
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!jobs.length) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h3 className="text-xl font-semibold text-gray-700">No jobs found</h3>
      <p className="text-gray-500 mt-2">Please try different filters or check back later.</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <JobFilters
          onFilterChange={handleFilterChange}
          jobTypes={jobTypes}
          jobTitles={jobTitles}
          companies={companies}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;