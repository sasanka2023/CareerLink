import React, { useState } from "react";
import { useEffect } from "react";
import {useLocation} from "react-router-dom";
import {useNavigation} from "react-router-dom";

import ContactEmployee from "../components/Dashboard/CompanyDashboard/ContactEmployee";
import FeaturesAndPartners from "../components/Dashboard/CompanyDashboard/FeaturesAndPartners";



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


function Employer() {
  const location = useLocation();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.company) {
      setCompany(location.state.company);
      setLoading(false);
    }
  }, [location.state]);

  if (loading) return <div className="min-h-screen bg-gray-50 p-8">Loading...</div>;
  if (!company) return <div className="min-h-screen bg-gray-50 p-8">Company not found</div>;



  return (
      <div className="min-h-screen bg-gray-50">
        <CompanyHeader companyInfo={company} />



        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

              <div className="space-y-8">
                {/* About Section */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold mb-4">About Us</h2>
                  <p className="text-gray-600 mb-6">{company.description}</p>
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <p className="text-gray-600 mb-6">{company.requirements}</p>

                  {/* Technologies */}
                  <h3 className="text-xl font-semibold mb-4">
                    Technologies We Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {company.technologies?.map((tech) => (
                        <span
                            key={tech.techId}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
            {tech.techName}
          </span>
                    ))}
                  </div>
                </div>

                <FeaturesAndPartners companyInfo={company}/>

                {/* Contact */}
                <ContactEmployee company={company}/>
              </div>

        </main>


      </div>
  );
}

export default Employer;
