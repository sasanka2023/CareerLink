import React, { useState } from "react";
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
import CompanyHeader from "../components/companyDashboard/CompanyHeader";
import JobPostForm from "../components/companyDashboard/JobPostForm";
import JobCard from "../components/companyDashboard/JobCard";
import AboutUs from "../components/companyDashboard/AboutUs";
import CompanyProfile from "../components/companyDashboard/CompanyProfile";
import ContactUs from "../components/companyDashboard/ContactUs";
import JobVacancies from "../components/companyDashboard/JobVacancies";
import UpdateCompanyDetailsModal from "../components/companyDashboard/UpdateCompanyDetailsModal";
import UserReviews from "../components/companyDashboard/UserReviews";
import CVList from "../components/companyDashboard/CVList";

function CompanyDashboard() {
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
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
    about:
      "TechBridge Solutions is a pioneering platform dedicated to bridging the gap between talented undergraduates and innovative companies. We leverage cutting-edge technology to analyze student strengths, recommend skill improvements, and facilitate meaningful connections with employers. Our mission is to empower the next generation of professionals while helping companies find their perfect match.",
    technologies: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Python"] },
      { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis"] },
      { category: "Cloud", items: ["AWS", "Docker", "Kubernetes"] },
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
      <CompanyHeader companyInfo={companyInfo} />

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

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Recent Applications
                </h2>
                <div className="space-y-4">
                  {applicants.slice(0, 3).map((applicant) => (
                    <div
                      key={applicant.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={applicant.image}
                          alt={applicant.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-gray-600">
                            {applicant.position}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                        {applicant.status}
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

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={applicant.image}
                            alt={applicant.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-4">
                            <p className="font-medium">{applicant.name}</p>
                            <p className="text-sm text-gray-600">
                              {applicant.university}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {applicant.position}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {applicant.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <ThumbsUp className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "about" && (
          <div className="space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <p className="text-gray-600 mb-6">{companyInfo.about}</p>

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

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Our Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {companyInfo.features.map((feature) => (
                  <div key={feature.title} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {companyInfo.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{partner.name}</h3>
                      <p className="text-sm text-gray-600">
                        {partner.industry}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">support@techbridge.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-gray-600">
                        linkedin.com/company/techbridge
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Send us a message
                  </button>
                </div>
              </div>
            </div>
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
