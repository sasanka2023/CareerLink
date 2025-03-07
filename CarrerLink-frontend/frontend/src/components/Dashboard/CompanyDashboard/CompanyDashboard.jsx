import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from '../../../api/AuthProvider';
import { useContext } from "react";
import ContactEmployee from "./ContactEmployee";
import FeaturesAndPartners from "./FeaturesAndPartners";
import Applications from "./Applications";
import { getCompanyDetailsByUsername} from "../../../api/CompanyDetailsApi";
import {getApprovedApplicants} from "../../../api/CompanyDetailsGetApi";
import {
  Users,
  Briefcase,
  Building2,
  Bell,
  Settings,
  User,
  BarChart as ChartBar,
  FileText,
  Mail,
  Phone,
  Linkedin,
  MessageSquare,
  Star,
  CheckCircle,
  Download,
  Eye,
  ThumbsUp,
  X,
} from "lucide-react";
import CompanyHeader from "../../companyDashboard/CompanyHeader";
import JobPostForm from "../../companyDashboard/JobPostForm";
import JobCard from "../../companyDashboard/JobCard";


function CompanyDashboard() {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [approvedapplicant, setApproved] = useState([{}]);
  const[company,setCompany] = useState({});
  const [jobVacancies, setJobVacancies] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      department: "Engineering",
      type: "Internship",
      applications: 45,
      status: "Active",
      requirements: ["React", "JavaScript", "HTML/CSS"],
      description:
        "Looking for a passionate frontend developer intern to join our engineering team.",
    },
    {
      id: 2,
      title: "UX Design Associate",
      department: "Design",
      type: "Full-time",
      applications: 32,
      status: "Active",
      requirements: ["Figma", "UI/UX", "Prototyping"],
      description:
        "Seeking a creative UX designer to help shape our product experience.",
    },
  ]);
  const applicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Frontend Developer Intern",
      university: "MIT",
      skills: ["React", "JavaScript", "TypeScript"],
      status: "Interview Scheduled",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "UX Design Associate",
      university: "Stanford",
      skills: ["Figma", "UI/UX", "Adobe XD"],
      status: "Application Review",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
    },
  ];
  const companyInfo = {
    name: "TechBridge Solutions",
    logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      description:
      "TechBridge Solutions is a pioneering platform dedicated to bridging the gap between talented undergraduates and innovative companies. We leverage cutting-edge technology to analyze student strengths, recommend skill improvements, and facilitate meaningful connections with employers. Our mission is to empower the next generation of professionals while helping companies find their perfect match.",
    technologies: [
      {  items: ["React", "TypeScript", "Tailwind CSS"] },
      {  items: ["Node.js", "Express", "Python"] },
      {  items: ["PostgreSQL", "MongoDB", "Redis"] },
      {  items: ["AWS", "Docker", "Kubernetes"] },
    ],
    features: [
      {
        title: "Smart CV Generation",
        description: "AI-powered CV creation and optimization",
        icon: FileText,
      },
      {
        title: "Skill Matching",
        description: "Advanced algorithm for job-skill compatibility",
        icon: CheckCircle,
      },
      {
        title: "Course Recommendations",
        description: "Personalized learning paths",
        icon: Star,
      },
      {
        title: "Analytics Dashboard",
        description: "Comprehensive recruitment insights",
        icon: ChartBar,
      },
    ],
    partners: [
      {
        name: "TechCorp Inc.",
        industry: "Software Development",
        logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
      },
      {
        name: "Innovation Labs",
        industry: "Research & Development",
        logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
      },
      {
        name: "DataSphere",
        industry: "Data Analytics",
        logo: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
      },
    ],
  };
//--------------------------------------------------------------------------------------------------
  const extractUsernameFromToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const fetchApprovedApplicants = async () => {
    try {
      if (company?.id) { // Ensure company ID is available
        const approvedResponse = await getApprovedApplicants(company.id);
        if (approvedResponse?.success) {
          setApproved(approvedResponse.data);
        }
      }
    } catch (error) {
      console.error('Error fetching approved applicants:', error);
    }
  };
  //-----------------------useEffect
  useEffect(() => {
    let isMounted = true;

    const fetchCompanyData = async () => {
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }
      try {
        const username = extractUsernameFromToken(token);
        if (!username) return;

        // Fetch company details
        const companyResponse = await getCompanyDetailsByUsername(username);
        if (isMounted && companyResponse?.success) {
          setCompany(companyResponse.data);

          // Fetch approved applicants only if company ID is available
          if (companyResponse.data?.id) {
            const approvedResponse = await getApprovedApplicants(companyResponse.data.id);
            if (isMounted && approvedResponse?.success) {
              setApproved(approvedResponse.data);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCompanyData();

    return () => { isMounted = false; };
  }, [token]); // Dependency array remains the same

  if (loading) return <div>Loading...</div>;

  console.log(company);
  // if (!studentInfo) return <div>Student not found</div>;

//---------------------------------------------------------------------------------------------------------------
  const handlePostJob = (jobData: any) => {
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

  const handleEditJob = (id: number) => {
    // Implement edit functionality
    console.log("Edit job:", id);
  };

  const handleCloseJob = (id: number) => {
    setJobVacancies((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: "Closed" } : job))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader companyInfo={company} />

      {/* Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: "dashboard", name: "Dashboard", icon: ChartBar },
              { id: "jobs", name: "Job Vacancies", icon: Briefcase },
              { id: "applicants", name: "Applicants", icon: Users },
              { id: "about", name: "About", icon: Building2 },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === item.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold">158</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Interviews</p>
                    <p className="text-2xl font-bold">28</p>
                  </div>
                  <Building2 className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Hired</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <ChartBar className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Statistics and Approved List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Recent Applications
                </h2>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {approvedapplicant.map((applicant) => (
                    <div
                      key={applicant.studentId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={applicant.image}
                          alt={applicant.firstName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{applicant.firstName}</p>
                          <p className="text-sm text-gray-600">
                            {applicant.university}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                        Interview sheduled
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Application Statistics
                </h2>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    Statistics chart will be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedTab === "jobs" && (
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
                  key={job.id}
                  job={job}
                  onEdit={handleEditJob}
                  onClose={handleCloseJob}
                />
              ))}
            </div>
          </div>
        )}
        {selectedTab === "applicants" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Applicants</h2>
              <div className="flex gap-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Filter
                </button>
              </div>
            </div>
            {/* --------------- */}
            <Applications applicants={applicants} company={company}/>
            {/* ----------------------- */}
          </div>
        )}

        {selectedTab === "about" && (
          <div className="space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <p className="text-gray-600 mb-6">{company.description}</p>

              {/* Technologies */}
              <h3 className="text-xl font-semibold mb-4">
                Technologies We Use
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {companyInfo.technologies.map((tech) => (
                  <div key={tech.category} className="space-y-2">
                    <h4 className="font-medium text-gray-900">
                      {tech.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

           <FeaturesAndPartners companyInfo={companyInfo} />

            {/* Contact */}
            <ContactEmployee/>
          </div>
        )}
      </main>

      {showJobForm && (
        <JobPostForm
          onClose={() => setShowJobForm(false)}
          onSubmit={handlePostJob}
        />
      )}
    </div>
  );
}

export default CompanyDashboard;
