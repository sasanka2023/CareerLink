import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../components/Dashboard/CompanyDashboard/CompanyDashboardLayout";
import { AuthContext } from "../api/AuthProvider";
import { getCompanyDetailsByUsername } from "../api/CompanyDetailsApi";
import JobVacancyCard from "../components/companyDashboard/JobCard";
import JobPostForm from "../components/companyDashboard/JobPostForm";
import {
  Briefcase,
  Building2,
  BarChart as ChartBar,
  Download,
  Eye,
  ThumbsUp,
  X,
  Mail,
  Phone,
  Linkedin,
  MessageSquare,
} from "lucide-react";

const CompanyDashboard = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const { token } = useContext(AuthContext);

  const extractUsernameFromToken = (token) => {
    try {
      if (!token) return null;
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.username || decodedToken.userId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCompanyData = async () => {
      if (!token) {
        console.warn("⚠️ No token available. Skipping API call.");
        setLoading(false);
        return;
      }

      try {
        const username = extractUsernameFromToken(token);
        if (!username) {
          console.error("❌ Username extraction failed.");
          setLoading(false);
          return;
        }

        const response = await getCompanyDetailsByUsername(username);

        if (isMounted && response?.success) {
          setCompanyInfo(response.data);
          setJobVacancies(response.data.jobVacancies || []);
        } else {
          setCompanyInfo(null);
        }
      } catch (error) {
        console.error("❌ Error fetching company data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCompanyData();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const handlePostJob = (jobData) => {
    setJobVacancies((prev) => [
      ...prev,
      { id: prev.length + 1, ...jobData, applications: 0, status: "Active" },
    ]);
    setShowJobForm(false);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!companyInfo) {
    return (
      <div className="text-center mt-5 text-red-600">
        ⚠️ Company not found. Please check your credentials.
      </div>
    );
  }

  return (
    <DashboardLayout
      companyName={companyInfo.name}
      profilePicture={companyInfo.logo}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={companyInfo.logo}
                alt={companyInfo.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{companyInfo.name}</h2>
              <p className="text-gray-600 mb-2">{companyInfo.email}</p>
              <div className="w-full border-t border-gray-100 my-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Industry</p>
                    <p className="font-medium">{companyInfo.industry}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{companyInfo.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Website</p>
                    <p className="font-medium">{companyInfo.website}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{companyInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Job Postings</h3>
              <p className="text-3xl font-bold">{jobVacancies.length}</p>
              <p className="text-indigo-100">Active job postings</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Applications</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-purple-100">Total applications</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Interviews</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-pink-100">Scheduled interviews</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Job Vacancies</h2>
            {jobVacancies.length > 0 ? (
              jobVacancies.map((job) => (
                <JobVacancyCard key={job.id} job={job} />
              ))
            ) : (
              <p>No job vacancies posted yet.</p>
            )}
            <button
              onClick={() => setShowJobForm(true)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>

      {showJobForm && (
        <JobPostForm
          onClose={() => setShowJobForm(false)}
          onPost={handlePostJob}
        />
      )}
    </DashboardLayout>
  );
};

export default CompanyDashboard;
